import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import docsMap from '../docs-map.json';
import CodeBlock from '../components/CodeBlock';
import NotFoundPage from './NotFoundPage';
import { useSidebar } from '../context/SidebarContext';
import { ThemeContext } from '../context/ThemeContext';

function DocViewerPage() {
  const { category, file } = useParams();
  const [markdown, setMarkdown] = useState('');
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { openSidebar } = useSidebar();
  const { theme } = useContext(ThemeContext);
  const touchStartRef = useRef(null);

  const resolvePath = (base, relative) => {
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
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme);
  }, [theme]);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (touchStartRef.current === null) {
        return;
      }
      const touchEnd = e.changedTouches[0].clientX;
      if (touchStartRef.current < 50 && touchEnd - touchStartRef.current > 50) {
        openSidebar();
      }
      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [openSidebar]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const currentDoc = docsMap.find(
      (d) => d.category === category && d.name === file
    );
    setDoc(currentDoc);

    if (currentDoc) {
      fetch(currentDoc.path)
        .then((response) => response.text())
        .then((text) => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching markdown:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [category, file]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!doc) {
    return <NotFoundPage />;
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main className="bg-background min-w-0">
          <div
            className="markdown-body p-2 sm:p-6"
            data-theme={theme}
            style={{ backgroundColor: 'transparent' }}
          >
            <ReactMarkdown
              children={markdown}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  if (!inline && match) {
                    const code = node.children[0].value;
                    return (
                      <CodeBlock
                        language={match[1]}
                        value={code}
                        {...props}
                      />
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                a: ({ node, children, ...props }) => {
                  const { href } = props;

                  // 1. Handle internal anchor links with smooth scrolling
                  if (href && href.startsWith('#')) {
                    return <HashLink smooth to={href} {...props}>{children}</HashLink>;
                  }

                  // 2. Handle links to other markdown documents
                  if (href && href.includes('.md')) {
                    const currentDocInMap = docsMap.find(d => d.category === category && d.name === file);
                    if (currentDocInMap) {
                      const [path, hash] = href.split('#');
                      const resolvedPath = resolvePath(currentDocInMap.path, path);
                      const cleanedPath = resolvedPath.replace(/\.md$/, '');
                      const linkedDoc = docsMap.find(d => d.path.replace(/\.md$/, '') === cleanedPath);

                      if (linkedDoc) {
                        const to = `/docs/${linkedDoc.category}/${linkedDoc.name}`;
                        // Use HashLink for smooth scrolling if there's a hash
                        if (hash) {
                          return <HashLink smooth to={`${to}#${hash}`} {...props}>{children}</HashLink>;
                        }
                        return <Link to={to} {...props}>{children}</Link>;
                      }
                    }
                  }

                  // 3. Handle all other cases as external links
                  return <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>;
                }
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DocViewerPage;
