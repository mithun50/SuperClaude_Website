import React from 'react';
import { GlowingEffect } from './ui/glowing-effect';

const InfoCard = ({ title, description }) => {
  return (
    <div className="relative h-full rounded-lg border-[0.75px] border-border p-2 md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-md border-[0.75px] bg-background p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
