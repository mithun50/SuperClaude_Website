import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';
import { GradientText } from './ui/gradient-text';

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
        <GradientText className="text-xl font-semibold">{name}</GradientText>
        <p className="text-muted-foreground mt-1">{role}</p>
      </div>
    </a>
  );
};

export default TeamMemberCard;
