import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import docsMap from '../docs-map.json';
import { useSidebar } from '../context/SidebarContext';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();

  const groupedDocs = docsMap.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out",
        "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:flex-shrink-0 lg:w-64 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex justify-between items-center p-4 lg:hidden">
        <h3 className="text-lg font-semibold">Documentation Menu</h3>
        <button onClick={closeSidebar} className="p-2 rounded-md hover:bg-muted">
          <X size={20} />
        </button>
      </div>
      <nav className="p-4">
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
                    onClick={closeSidebar}
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
