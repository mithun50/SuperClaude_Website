import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
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
                a({ node, children, ...props }) {
                  const { href } = props;
                  if (href && href.startsWith('#')) {
                    return <a {...props}>{children}</a>;
                  }
                  if (href && href.includes('.md')) {
                    const [path, hash] = href.split('#');
                    const fileName = path.split('/').pop().replace('.md', '');
                    const linkedDoc = docsMap.find(d => d.name === fileName);

                    if (linkedDoc) {
                      const to = hash
                        ? `/docs/${linkedDoc.category}/${linkedDoc.name}#${hash}`
                        : `/docs/${linkedDoc.category}/${linkedDoc.name}`;
                      return <Link to={to} {...props}>{children}</Link>;
                    }
                  }
                  // For all other links, or if .md link not found in docsMap
                  return <a {...props} target="_blank" rel="noopener noreferrer">{children}</a>;
                },
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DocViewerPage;

    
