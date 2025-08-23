import React, { useState } from 'react';
import { GlowingEffectDemo } from '../components/glowing-effect-demo';
import { Heart, BookOpen, Users, Github, ArrowRight } from 'lucide-react';

function HomePage() {
  const [isCopied, setIsCopied] = useState(false);
  const codeToCopy = `pip install SuperClaude && SuperClaude install`;

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const features = [
    {
      title: "Sponsor Development",
      description: "Support the project to ensure continuous improvement.",
      link: "https://github.com/sponsors/NomenAK",
      isExternal: true,
      icon: <Heart size={24} className="text-accent" />
    },
    {
      title: "Read the Docs",
      description: "Explore the comprehensive documentation.",
      link: "/docs",
      icon: <BookOpen size={24} className="text-accent" />
    },
    {
      title: "Meet the Contributors",
      description: "See the amazing people behind the project.",
      link: "/contributors",
      icon: <Users size={24} className="text-accent" />
    },
    {
      title: "View on GitHub",
      description: "Check out the source code and contribute.",
      link: "https://github.com/SuperClaude-Org/SuperClaude_Framework",
      isExternal: true,
      icon: <Github size={24} className="text-accent" />
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-12 sm:py-16 md:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
          SuperClaude Framework
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-secondary-foreground">
          A meta-programming framework for Claude Code that enhances it with 21 slash commands, 13 AI specialists, and 6 behavioral modes.
        </p>
        <div className="mt-10">
          <a href="#quick-start" className="btn btn-neon text-foreground">
            Get Started <ArrowRight className="inline-block ml-2" />
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <GlowingEffectDemo features={features} />
      </div>

      {/* Quick Start Section */}
      <div id="quick-start" className="py-12 sm:py-16 md:py-20 bg-background/80 backdrop-blur-lg border border-border rounded-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-center text-foreground">
          SuperClaude Quick Start Guide
        </h2>
        <p className="mt-4 text-center italic text-secondary-foreground">
          Get up and running with SuperClaude in just a few minutes.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-invert">
            <h3 className="text-2xl font-bold mb-4 text-foreground">1. Installation</h3>
            <p className="text-secondary-foreground">
              Install the framework using pip. This single command sets up everything you need.
            </p>
            <div className="relative mt-4">
              <div className="bg-primary/50 p-4 rounded-md border border-border">
                <pre className="whitespace-pre-wrap"><code className="text-accent break-words">{codeToCopy}</code></pre>
              </div>
              <button onClick={() => handleCopy(codeToCopy)} className="absolute top-2 right-2 px-3 py-1 border border-border text-sm font-medium rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-300">
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="prose prose-invert">
            <h3 className="text-2xl font-bold mb-4 text-foreground">2. First Commands</h3>
            <p className="text-secondary-foreground">
              After installation, you can start using the slash commands in Claude Code.
            </p>
            <div className="bg-primary/50 p-4 rounded-md border border-border">
              <pre className="whitespace-pre-wrap"><code className="text-accent break-words">
# Interactive project discovery
/sc:brainstorm "web app for task management"

# Analyze existing code
/sc:analyze src/

# Generate implementation plan
/sc:workflow "add user authentication"
              </code></pre>
            </div>
          </div>
        </div>
      </div>

       {/* What is SuperClaude Section */}
       <div className="py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">What is SuperClaude?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-secondary-foreground">
            SuperClaude is a meta-programming framework that enhances Claude Code with a suite of powerful tools and features.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-background/80 backdrop-blur-lg border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground">21 Slash Commands</h3>
            <p className="mt-2 text-secondary-foreground">For workflow automation like brainstorming, implementation, and analysis.</p>
          </div>
          <div className="bg-background/80 backdrop-blur-lg border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground">13 AI Specialists</h3>
            <p className="mt-2 text-secondary-foreground">Domain experts in architecture, security, frontend, and backend.</p>
          </div>
          <div className="bg-background/80 backdrop-blur-lg border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold text-foreground">6 Behavioral Modes</h3>
            <p className="mt-2 text-secondary-foreground">For different contexts like brainstorming, introspection, and orchestration.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
