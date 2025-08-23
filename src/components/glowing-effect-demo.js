"use client";

import { GlowingEffect } from "./ui/glowing-effect";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

const areas = [
  "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
  "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
  "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]",
  "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
];

export function GlowingEffectDemo({ features }) {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      {features.map((feature, index) => (
        <GridItem
          key={feature.title}
          area={areas[index]}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          link={feature.link}
          isExternal={feature.isExternal}
        />
      ))}
    </ul>
  );
}

const GridItem = ({ area, icon, title, description, link, isExternal }) => {
  const content = (
    <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
            {icon}
          </div>
          <div className="space-y-3">
            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
              {title}
            </h3>
            <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const containerClassName = cn("min-h-[14rem] list-none", area);

  if (isExternal) {
    return (
      <li className={containerClassName}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="h-full block">
          {content}
        </a>
      </li>
    );
  }

  return (
    <li className={containerClassName}>
      <Link to={link} className="h-full block">
        {content}
      </Link>
    </li>
  );
};
