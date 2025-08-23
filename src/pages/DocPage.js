import React, { useEffect, useRef } from 'react';
import DocCard from '../components/DocCard';
import Sidebar from '../components/Sidebar';
import { useSidebar } from '../context/SidebarContext';
import docsMap from '../docs-map.json';

function DocPage() {
  const { openSidebar } = useSidebar();
  const touchStartRef = useRef(null);

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

  const groupedDocs = docsMap.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        <Sidebar />
        <main className="flex-1">
          <div className="text-center">
            <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              Documentation
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-light-text/80 dark:text-dark-text/80">
              Access all the guides and resources for SuperClaude v3.
            </p>
          </div>

          <div className="mt-12">
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold mb-4">{category.replace(/[-_]/g, ' ')}</h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {docs.map((doc) => (
                    <DocCard key={doc.name} doc={doc} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DocPage;
