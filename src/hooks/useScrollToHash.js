import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash(markdown) {
  const location = useLocation();

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

  // Handle hash scrolling when location or markdown content changes
  useEffect(() => {
    if (location.hash && markdown) {
      // Wait for markdown to render before scrolling
      setTimeout(() => {
        scrollToHash(location.hash);
      }, 100);
    }
  }, [location.hash, markdown]);

  return { scrollToHash };
}