import React, { useState } from 'react';
import { motion } from "framer-motion";
import { LampContainer } from '../components/ui/lamp';
import { GradientText } from '../components/ui/gradient-text';
import { GlowingEffect } from '../components/ui/glowing-effect';
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
    <div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          SuperClaude Framework
        </motion.h1>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <GradientText className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl">
            A meta-programming framework for Claude Code that enhances it with 22 slash commands, 14 agents, and 6 behavioral modes.
          </GradientText>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-10"
        >
          <a href="#quick-start" className="btn btn-neon text-foreground">
            Get Started <ArrowRight className="inline-block ml-2" />
          </a>
        </motion.div>
      </LampContainer>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <GlowingEffectDemo features={features} />
      </div>

      {/* Quick Start Section */}
      <div id="quick-start" className="relative py-12 sm:py-16 md:py-20 bg-background/80 backdrop-blur-lg border border-border rounded-2xl px-4 sm:px-6 lg:px-8">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <GradientText className="text-3xl font-extrabold tracking-tight sm:text-4xl text-center">
          SuperClaude Quick Start Guide
        </GradientText>
        <p className="mt-4 text-center italic text-secondary-foreground">
          Get up and running with SuperClaude in just a few minutes.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-invert">
            <GradientText className="text-2xl font-bold mb-4">1. Installation</GradientText>
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
            <GradientText className="text-2xl font-bold mb-4">2. First Commands</GradientText>
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
          <GradientText className="text-3xl sm:text-4xl font-extrabold tracking-tight">What is SuperClaude?</GradientText>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-secondary-foreground">
            SuperClaude is a meta-programming framework that enhances Claude Code with a suite of powerful tools and features.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="relative bg-background/80 backdrop-blur-lg border border-border p-6 rounded-xl">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <GradientText className="text-xl font-bold">22 Slash Commands</GradientText>
            <p className="mt-2 text-secondary-foreground">For workflow automation like brainstorming, implementation, and analysis.</p>
          </div>
          <div className="relative bg-background/80 backdrop-blur-lg border border-border p-6 rounded-xl">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <GradientText className="text-xl font-bold">14 Agents</GradientText>
            <p className="mt-2 text-secondary-foreground">Domain experts in architecture, security, frontend, and backend.</p>
          </div>
          <div className="relative bg-background/80 backdrop-blur-lg border border-border p-6 rounded-xl">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
              borderWidth={3}
            />
            <GradientText className="text-xl font-bold">6 Behavioral Modes</GradientText>
            <p className="mt-2 text-secondary-foreground">For different contexts like brainstorming, introspection, and orchestration.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
