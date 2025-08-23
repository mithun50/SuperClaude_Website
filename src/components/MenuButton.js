import React from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const MenuButton = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
      aria-label="Toggle sidebar"
    >
      <PanelLeftOpen />
    </button>
  );
};

export default MenuButton;
