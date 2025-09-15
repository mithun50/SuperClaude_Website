import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import CodeBlock from '../components/CodeBlock';
import NotFoundPage from './NotFoundPage';
import { useSidebar } from '../context/SidebarContext';
import { ThemeContext } from '../context/ThemeContext';
import { useDocumentationLoader } from '../hooks/useDocumentationLoader';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { useTouchGestures } from '../hooks/useTouchGestures';
import { resolveMarkdownLink } from '../utils/linkResolver';

function DocViewerPage() {
  const { category, file } = useParams();
  const { openSidebar } = useSidebar();
  const { theme } = useContext(ThemeContext);
  
  // Custom hooks
  const { markdown, doc, loading, error } = useDocumentationLoader(category, file);
  const { scrollToHash } = useScrollToHash(markdown);
  useTouchGestures(openSidebar);


  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme);
  }, [theme]);


  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading documentation...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Failed to load documentation</h1>
            <p className="text-muted-foreground mb-6">
              {error.message || 'An error occurred while loading the documentation.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
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
                  const markdownLink = resolveMarkdownLink(href, category, file);
                  if (markdownLink) {
                    // Use HashLink for smooth scrolling if there's a hash
                    if (markdownLink.hash) {
                      return <HashLink smooth to={`${markdownLink.to}#${markdownLink.hash}`} {...props}>{children}</HashLink>;
                    }
                    return <Link to={markdownLink.to} {...props}>{children}</Link>;
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
