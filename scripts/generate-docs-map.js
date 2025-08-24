const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../public/docs');
const outputFile = path.join(__dirname, '../src/docs-map.json');

const categoryOrder = [
  "Getting-Started",
  "User-Guide",
  "Reference",
  "Developer-Guide",
  "Templates"
];

function getDocsMap(dir) {
  const categories = fs.readdirSync(dir).filter(file => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isDirectory();
  });

  // Sort categories based on the defined order
  const sortedCategories = categories.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  let docsMap = [];

  sortedCategories.forEach(category => {
    const categoryDir = path.join(dir, category);
    const files = fs.readdirSync(categoryDir);

    files.forEach(file => {
      if (path.extname(file) === '.md') {
        const fullPath = path.join(categoryDir, file);
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
  });

  return docsMap;
}

const docsMap = getDocsMap(docsDir);
fs.writeFileSync(outputFile, JSON.stringify(docsMap, null, 2));
console.log('Successfully generated docs-map.json');
