import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

const ContributorCard = ({ contributor }) => {
  return (
    <a
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group block h-full rounded-lg border-[0.75px] border-border p-2 md:p-3"
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-md border-[0.75px] bg-background p-6 shadow-sm text-center">
        <img src={contributor.avatar_url} alt={contributor.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
        <p className="w-full font-semibold truncate text-foreground">{contributor.name || contributor.login}</p>
        <p className="text-xs text-muted-foreground">{contributor.contributions} contributions</p>
      </div>
    </a>
  );
};

export default ContributorCard;
