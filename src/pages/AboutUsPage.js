import React from 'react';

import TeamMemberCard from '../components/TeamMemberCard';
import InfoCard from '../components/InfoCard';

const teamMembers = [
  {
    name: "NomenAK",
    githubUrl: "https://github.com/NomenAK",
    avatarUrl: "https://github.com/NomenAK.png",
    role: "Owner & Maintainer of SuperClaude_Framework"
  },
  {
    name: "Mithun Gowda B",
    githubUrl: "https://github.com/mithun50",
    avatarUrl: "https://github.com/mithun50.png",
    role: "Collaborator, Maintainer & SuperClaude_Website Author"
  }
];

const infoItems = [
  {
    title: "Open Source",
    description: "The entire project is open source and released under the MIT License. You can view the source code, contribute to the project, and use it freely in your own work."
  },
  {
    title: "Community Driven",
    description: "SuperClaude is built by and for the community. We welcome contributions of all kinds, from bug reports to new features."
  },
  {
    title: "Privacy Focused",
    description: "SuperClaude runs 100% locally with no third-party servers or data collection. Your code and data stay on your machine."
  },
  {
    title: "Constantly Improving",
    description: "We are always working on improving SuperClaude. Check out our roadmap and contribute to the future of the project."
  }
];

function AboutUsPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            About SuperClaude_Framework
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-light-text/80 dark:text-dark-text/80">
            A meta-programming framework for Claude Code that enhances it with 21 slash commands, 13 AI specialists, and 6 behavioral modes.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8">Meet the Team</h3>
          <div className="grid gap-10 md:grid-cols-2">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {infoItems.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
