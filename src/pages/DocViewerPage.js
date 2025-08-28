import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug'; // Add this plugin
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

  // Function to handle scrolling to hash
  const scrollToHash = (hash) => {
    if (!hash) return;

    const id = hash.startsWith('#') ? hash.substring(1) : hash;
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If element not found, try again after a short delay (for dynamic content)
      setTimeout(() => {
        const retryElement = document.getElementById(id);
        if (retryElement) {
          retryElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);
    }
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

  // Handle hash scrolling when location or markdown content changes
  useEffect(() => {
    if (location.hash && markdown) {
      // Wait for markdown to render before scrolling
      setTimeout(() => {
        scrollToHash(location.hash);
      }, 100);
    }
  }, [location.hash, markdown]);

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
              rehypePlugins={[rehypeRaw, rehypeSlug]} // Add rehypeSlug for automatic heading IDs
              components={{
                // Add custom heading components to ensure IDs are generated
                h1: ({ node, children, ...props }) => (
                  <h1 {...props} id={props.id || children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
                    {children}
                  </h1>
                ),
                h2: ({ node, children, ...props }) => (
                  <h2 {...props} id={props.id || children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
                    {children}
                  </h2>
                ),
                h3: ({ node, children, ...props }) => (
                  <h3 {...props} id={props.id || children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
                    {children}
                  </h3>
                ),
                h4: ({ node, children, ...props }) => (
                  <h4 {...props} id={props.id || children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
                    {children}
                  </h4>
                ),
                h5: ({ node, children, ...props }) => (
                  <h5 {...props} id={props.id || children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
                    {children}
                  </h5>
                ),
                h6: ({ node, children, ...props }) => (
                  <h6 {...props} id={props.id || children.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}>
                    {children}
                  </h6>
                ),
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
                    return (
                      <a
                        {...props}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHash(href);
                          // Update URL without triggering a page reload
                          window.history.pushState(null, '', href);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {children}
                      </a>
                    );
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
