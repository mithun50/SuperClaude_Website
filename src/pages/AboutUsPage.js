import React from 'react';

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
            <div className="flex flex-col items-center text-center">
              <a href="https://github.com/NomenAK" target="_blank" rel="noopener noreferrer" className="group">
                <img
                  className="w-32 h-32 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  src="https://github.com/NomenAK.png"
                  alt="NomenAK's avatar"
                />
                <h4 className="text-xl font-semibold group-hover:text-accent">NomenAK</h4>
              </a>
              <p className="text-light-text/80 dark:text-dark-text/80">Owner & Maintainer of SuperClaude_Framework</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <a href="https://github.com/mithun50" target="_blank" rel="noopener noreferrer" className="group">
                <img
                  className="w-32 h-32 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  src="https://github.com/mithun50.png"
                  alt="Mithun Gowda B's avatar"
                />
                <h4 className="text-xl font-semibold group-hover:text-accent">Mithun Gowda B</h4>
              </a>
              <p className="text-light-text/80 dark:text-dark-text/80">Collaborator, Maintainer & SuperClaude_Website Author</p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <div className="p-6 border border-light-accent dark:border-dark-accent rounded-lg">
            <h3 className="text-xl font-semibold">Open Source</h3>
            <p className="mt-2 text-base text-light-text/80 dark:text-dark-text/80">
              The entire project is open source and released under the MIT License. You can view the source code, contribute to the project, and use it freely in your own work.
            </p>
          </div>
          <div className="p-6 border border-light-accent dark:border-dark-accent rounded-lg">
            <h3 className="text-xl font-semibold">Community Driven</h3>
            <p className="mt-2 text-base text-light-text/80 dark:text-dark-text/80">
              SuperClaude is built by and for the community. We welcome contributions of all kinds, from bug reports to new features.
            </p>
          </div>
          <div className="p-6 border border-light-accent dark:border-dark-accent rounded-lg">
            <h3 className="text-xl font-semibold">Privacy Focused</h3>
            <p className="mt-2 text-base text-light-text/80 dark:text-dark-text/80">
              SuperClaude runs 100% locally with no third-party servers or data collection. Your code and data stay on your machine.
            </p>
          </div>
          <div className="p-6 border border-light-accent dark:border-dark-accent rounded-lg">
            <h3 className="text-xl font-semibold">Constantly Improving</h3>
            <p className="mt-2 text-base text-light-text/80 dark:text-dark-text/80">
              We are always working on improving SuperClaude. Check out our roadmap and contribute to the future of the project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
