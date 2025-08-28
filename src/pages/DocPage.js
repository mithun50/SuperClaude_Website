import React, { useEffect, useRef } from 'react';
import DocCard from '../components/DocCard';
import { useSidebar } from '../context/SidebarContext';
import docsMap from '../docs-map.json';
import { GradientText } from '../components/ui/gradient-text';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <main>
          <div className="text-center">
            <GradientText className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
              Documentation
            </GradientText>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-light-text/80 dark:text-dark-text/80">
              Access all the guides and resources for SuperClaude v4.
            </p>
          </div>

          <div className="mt-12">
            {Object.entries(groupedDocs).map(([category, docs]) => (
              <div key={category} className="mb-12 text-center">
                <GradientText className="text-2xl font-bold mb-4">{category.replace(/[-_]/g, ' ')}</GradientText>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 justify-center">
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
