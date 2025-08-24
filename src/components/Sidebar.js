import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import docsMap from '../docs-map.json';
import { useSidebar } from '../context/SidebarContext';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const { category: activeCategory } = useParams();
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    if (activeCategory) {
      setOpenCategories((prev) => ({ ...prev, [activeCategory]: true }));
    }
  }, [activeCategory]);

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

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
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col",
        "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:flex-shrink-0 lg:w-64 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex justify-between items-center p-4 lg:hidden flex-shrink-0">
        <h3 className="text-lg font-semibold">Documentation Menu</h3>
        <button onClick={closeSidebar} className="p-2 rounded-md hover:bg-muted">
          <X size={20} />
        </button>
      </div>
      <nav className="p-4 overflow-y-auto">
        {Object.entries(groupedDocs).map(([category, docs]) => (
          <div key={category} className="mb-4">
            <button
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full text-lg font-semibold mb-2 text-left"
            >
              <span>{category.replace(/[-_]/g, ' ')}</span>
              <ChevronDown
                size={20}
                className={`transform transition-transform duration-200 ${
                  openCategories[category] ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openCategories[category] ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <ul className="pt-2 pl-4">
                {docs.map((doc) => (
                  <li key={doc.name}>
                    <NavLink
                      to={`/docs/${doc.category}/${doc.name}`}
                      className={({ isActive }) =>
                        cn(
                          "block py-1 text-muted-foreground hover:text-foreground",
                          isActive && "text-foreground font-semibold"
                        )
                      }
                      onClick={closeSidebar}
                    >
                      {doc.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
