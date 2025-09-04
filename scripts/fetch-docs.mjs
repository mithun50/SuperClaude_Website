import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_API_URL = 'https://api.github.com/repos/SuperClaude-Org/SuperClaude_Framework/contents/Docs';
const DOCS_DIR = path.join(__dirname, '../public/docs');
const CACHE_FILE = path.join(__dirname, '../.docs-cache.json');
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const CATEGORIES = [
  "Getting-Started",
  "User-Guide", 
  "Reference",
  "Developer-Guide",
  "Templates"
];

async function loadCache() {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, 'utf8');
    const cache = JSON.parse(cacheData);
    return cache;
  } catch (error) {
    return { timestamp: 0, etag: null };
  }
}

async function saveCache(cache) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Failed to save cache:', error.message);
  }
}

async function isCacheValid() {
  try {
    const cache = await loadCache();
    const now = Date.now();
    const cacheAge = now - cache.timestamp;
    
    if (cacheAge < CACHE_DURATION) {
      console.log(`Using cached docs (${Math.round(cacheAge / 1000)}s old)`);
      return true;
    }
    
    // Check if docs directory exists and has content
    try {
      const docsExists = await fs.access(DOCS_DIR);
      const stats = await fs.stat(DOCS_DIR);
      if (stats.isDirectory()) {
        const contents = await fs.readdir(DOCS_DIR);
        if (contents.length > 0) {
          console.log('Cache expired but docs exist, checking for updates...');
          return false;
        }
      }
    } catch (e) {
      // Directory doesn't exist, need fresh fetch
      return false;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

async function cleanDocsDir() {
  console.log('Cleaning docs directory...');
  for (const category of CATEGORIES) {
    const categoryDir = path.join(DOCS_DIR, category);
    try {
      await fs.rm(categoryDir, { recursive: true, force: true });
      console.log(`Removed directory: ${categoryDir}`);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Error removing directory ${categoryDir}:`, error);
      }
    }
  }
}

async function fetchAndSaveDocs(url, localPath, retryCount = 0) {
  const maxRetries = 3;
  const retryDelay = 1000 * Math.pow(2, retryCount); // Exponential backoff

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'SuperClaude-Website-Docs-Fetcher',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const waitTime = (resetTime * 1000) - Date.now();
        throw new Error(`GitHub API rate limit exceeded. Reset at ${new Date(resetTime * 1000).toISOString()}`);
      }
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
    }
    
    const items = await response.json();
    await fs.mkdir(localPath, { recursive: true });

    for (const item of items) {
      if (item.type === 'file' && path.extname(item.name) === '.md') {
        console.log(`Fetching file: ${item.path}`);
        const fileResponse = await fetch(item.download_url);
        
        if (!fileResponse.ok) {
          console.warn(`Failed to fetch file content: ${item.path}`);
          continue;
        }
        
        const content = await fileResponse.text();
        const localFilePath = path.join(localPath, item.name);
        await fs.writeFile(localFilePath, content);
        console.log(`Saved file: ${localFilePath}`);
      } else if (item.type === 'dir') {
        await fetchAndSaveDocs(item.url, path.join(localPath, item.name), retryCount);
      }
    }
  } catch (error) {
    if (retryCount < maxRetries) {
      console.warn(`Retry ${retryCount + 1}/${maxRetries} for ${url} after ${retryDelay}ms: ${error.message}`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
      return fetchAndSaveDocs(url, localPath, retryCount + 1);
    }
    
    console.error(`Error fetching from ${url} after ${maxRetries} retries:`, error.message);
    throw error;
  }
}

async function main() {
  try {
    // Check if we can use cached documentation
    if (await isCacheValid()) {
      console.log('✓ Using cached documentation');
      return;
    }

    console.log('🔄 Fetching fresh documentation from GitHub...');
    await cleanDocsDir();

    const fetchPromises = CATEGORIES.map(category => {
      const categoryUrl = `${GITHUB_API_URL}/${category}`;
      const localPath = path.join(DOCS_DIR, category);
      return fetchAndSaveDocs(categoryUrl, localPath);
    });

    await Promise.all(fetchPromises);

    // Update cache timestamp
    const cache = await loadCache();
    cache.timestamp = Date.now();
    await saveCache(cache);

    console.log('✓ Documentation fetching complete');
  } catch (error) {
    console.error('❌ Documentation fetch failed:', error.message);
    
    // Try to use existing docs if available
    try {
      await fs.access(DOCS_DIR);
      console.log('⚠️  Using existing cached documentation due to fetch failure');
      return;
    } catch (accessError) {
      console.error('💥 No cached documentation available and fetch failed');
      throw error;
    }
  }
}

main().catch(error => {
  console.error('Error fetching documentation:', error);
  process.exit(1);
});
