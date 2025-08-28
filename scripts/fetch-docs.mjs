import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_API_URL = 'https://api.github.com/repos/SuperClaude-Org/SuperClaude_Framework/contents/Docs';
const DOCS_DIR = path.join(__dirname, '../public/docs');

const CATEGORIES = [
  "Getting-Started",
  "User-Guide",
  "Reference",
  "Developer-Guide",
  "Templates"
];

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

async function fetchAndSaveDocs(url, localPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    const items = await response.json();

    await fs.mkdir(localPath, { recursive: true });

    for (const item of items) {
      if (item.type === 'file' && path.extname(item.name) === '.md') {
        console.log(`Fetching file: ${item.path}`);
        const fileResponse = await fetch(item.download_url);
        const content = await fileResponse.text();
        const localFilePath = path.join(localPath, item.name);
        await fs.writeFile(localFilePath, content);
        console.log(`Saved file: ${localFilePath}`);
      } else if (item.type === 'dir') {
        await fetchAndSaveDocs(item.url, path.join(localPath, item.name));
      }
    }
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

async function main() {
  await cleanDocsDir();
  console.log('Starting to fetch documentation from GitHub...');

  const fetchPromises = CATEGORIES.map(category => {
    const categoryUrl = `${GITHUB_API_URL}/${category}`;
    const localPath = path.join(DOCS_DIR, category);
    return fetchAndSaveDocs(categoryUrl, localPath);
  });

  await Promise.all(fetchPromises);

  console.log('Documentation fetching complete.');
}

main().catch(error => {
  console.error('Error fetching documentation:', error);
  process.exit(1);
});
