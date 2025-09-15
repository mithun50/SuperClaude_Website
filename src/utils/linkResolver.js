import docsMap from '../docs-map.json';

export function resolvePath(base, relative) {
  if (relative.startsWith('/')) {
    // Assuming absolute paths in markdown are relative to the /docs root
    return `/docs${relative}`;
  }

  const stack = base.split('/');
  stack.pop(); // remove current file name

  const parts = relative.split('/');
  for (const part of parts) {
    if (part === '.') continue;
    if (part === '..') {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }
  return stack.join('/');
}

export function resolveMarkdownLink(href, category, file) {
  if (!href || !href.includes('.md')) {
    return null;
  }

  const currentDocInMap = docsMap.find(d => d.category === category && d.name === file);
  if (!currentDocInMap) {
    return null;
  }

  const [path, hash] = href.split('#');
  const resolvedPath = resolvePath(currentDocInMap.path, path);
  const cleanedPath = resolvedPath.replace(/\.md$/, '');
  const linkedDoc = docsMap.find(d => d.path.replace(/\.md$/, '') === cleanedPath);

  if (!linkedDoc) {
    return null;
  }

  const to = `/docs/${linkedDoc.category}/${linkedDoc.name}`;
  return { to, hash };
}