import React from 'react';
import { Link } from 'react-router-dom';
import { GlowingEffect } from './ui/glowing-effect';

const DocCard = ({ doc }) => {
  return (
    <Link
      to={`/docs/${doc.category}/${doc.name}`}
      className="relative block h-full rounded-lg border-[0.75px] border-border p-2 md:p-3"
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative flex h-full items-center justify-center overflow-hidden rounded-md border-[0.75px] bg-background p-6 shadow-sm">
        <p className="text-xl font-semibold text-foreground">{doc.title}</p>
      </div>
    </Link>
  );
};

export default DocCard;
