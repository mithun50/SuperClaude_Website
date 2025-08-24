import React, { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Home, FileText, Users, Info } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import MenuButton from './MenuButton';
import { GradientText } from './ui/gradient-text';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const isDocPage = location.pathname.startsWith('/docs');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: '/', icon: <Home size={22} />, label: 'Home' },
    { to: '/docs', icon: <FileText size={22} />, label: 'Docs' },
    { to: '/contributors', icon: <Users size={22} />, label: 'Contributors' },
    { to: '/about', icon: <Info size={22} />, label: 'About Us' },
  ];

  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-foreground hover:bg-secondary";
  const activeLinkClasses = "bg-secondary";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-red-500 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {isDocPage && <MenuButton />}
            <NavLink to="/" className="flex items-center space-x-2 text-foreground">
              <GradientText className="font-bold text-lg">SuperClaude Framework</GradientText>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground hover:bg-secondary transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
            </button>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-md text-foreground hover:bg-secondary">
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 text-foreground hover:bg-secondary ${isActive ? activeLinkClasses : ''}`}
                onClick={toggleMenu}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
