import React from 'react';
import { Link } from 'react-router-dom';
import { GlowingEffect } from './GlowingEffect';

function Card({ title, description, link, isExternal = false, icon, index }) {
  const content = (
    <div
      className="group relative block p-6 bg-background/80 backdrop-blur-lg border border-border rounded-xl hover:bg-white/10 transition-all duration-300 h-full"
    >
      <GlowingEffect glow={true} spread={40} blur={10} borderWidth={3} />
      <div className="flex items-start mb-4">
        {icon && <div className="text-accent mr-4 mt-1">{icon}</div>}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-secondary-foreground mt-2">{description}</p>
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="h-full block">
        {content}
      </a>
    );
  }

  return (
    <Link to={link} className="h-full block">
      {content}
    </Link>
  );
}

export default Card;
