import React from 'react';
import { NavLink } from 'react-router-dom';
import docsMap from '../docs-map.json';

const Sidebar = () => {
  const groupedDocs = docsMap.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <aside className="w-64 flex-shrink-0">
      <nav className="sticky top-20">
        {Object.entries(groupedDocs).map(([category, docs]) => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{category.replace(/[-_]/g, ' ')}</h3>
            <ul>
              {docs.map((doc) => (
                <li key={doc.name}>
                  <NavLink
                    to={`/docs/${doc.category}/${doc.name}`}
                    className="block py-1 text-muted-foreground hover:text-foreground"
                    activeClassName="text-foreground font-semibold"
                  >
                    {doc.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
