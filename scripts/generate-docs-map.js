const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../public/docs');
const outputFile = path.join(__dirname, '../src/docs-map.json');

function getDocsMap(dir, category = '') {
  const files = fs.readdirSync(dir);
  let docsMap = [];

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      docsMap = docsMap.concat(getDocsMap(fullPath, file));
    } else if (path.extname(file) === '.md') {
      const content = fs.readFileSync(fullPath, 'utf8');
      const titleMatch = content.match(/^#\s+(.*)/);
      const title = titleMatch ? titleMatch[1] : path.basename(file, '.md');

      docsMap.push({
        category: category,
        name: path.basename(file, '.md'),
        title: title,
        path: path.join('/docs', category, file).replace(/\\/g, '/'),
      });
    }
  });

  return docsMap;
}

const docsMap = getDocsMap(docsDir);
fs.writeFileSync(outputFile, JSON.stringify(docsMap, null, 2));
console.log('Successfully generated docs-map.json');
