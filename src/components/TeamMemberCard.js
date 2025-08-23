import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

const TeamMemberCard = ({ name, githubUrl, avatarUrl, role }) => {
  return (
    <a
      href={githubUrl}
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
        <img src={avatarUrl} alt={`${name}'s avatar`} className="w-32 h-32 rounded-full mb-4" />
        <h4 className="text-xl font-semibold text-foreground">{name}</h4>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </a>
  );
};

export default TeamMemberCard;
