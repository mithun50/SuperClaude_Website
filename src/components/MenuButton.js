import React from 'react';
import { Library } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const MenuButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
      aria-label="Toggle sidebar"
    >
      <Library />
    </button>
  );
};

export default MenuButton;
