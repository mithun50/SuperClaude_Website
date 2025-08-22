import React from 'react';
import { Link } from 'react-router-dom';
import docsMap from '../docs-map.json';

function DocPage() {
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
                  <Link
                    key={doc.name}
                    to={`/docs/${doc.category}/${doc.name}`}
                    className="block p-6 border border-light-accent dark:border-dark-accent rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition-colors duration-300"
                  >
                    <p className="text-xl font-semibold text-light-text dark:text-dark-text">{doc.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DocPage;
