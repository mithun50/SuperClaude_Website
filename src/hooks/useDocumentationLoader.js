import { useState, useEffect } from 'react';
import docsMap from '../docs-map.json';

export function useDocumentationLoader(category, file) {
  const [markdown, setMarkdown] = useState('');
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDocumentation = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const currentDoc = docsMap.find(
          (d) => d.category === category && d.name === file
        );
        
        setDoc(currentDoc);

        if (currentDoc) {
          const response = await fetch(currentDoc.path);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch documentation: ${response.status} ${response.statusText}`);
          }
          
          const text = await response.text();
          setMarkdown(text);
        }
      } catch (err) {
        setError(err);
        console.error('Error loading documentation:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDocumentation();
  }, [category, file]);

  return { markdown, doc, loading, error };
}