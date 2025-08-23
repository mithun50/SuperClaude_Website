import React, { useState, useEffect } from 'react';
import ContributorCard from '../components/ContributorCard';

const excludedContributors = ['mithun50', 'NomenAK', 'google-labs-jules[bot]'];

function ContributorsPage() {
  const [superClaudeContributors, setSuperClaudeContributors] = useState([]);
  const [websiteContributors, setWebsiteContributors] = useState([]);

  const fetchContributorDetails = async (contributors) => {
    const detailedContributors = await Promise.all(
      contributors.map(async (contributor) => {
        const res = await fetch(`https://api.github.com/users/${contributor.login}`);
        const data = await res.json();
        return {
          ...contributor,
          name: data.name,
        };
      })
    );
    return detailedContributors;
  };

  useEffect(() => {
    async function fetchContributors() {
      try {
        const superClaudeRes = await fetch('https://api.github.com/repos/SuperClaude-Org/SuperClaude_Framework/contributors');
        const superClaudeData = await superClaudeRes.json();
        if (Array.isArray(superClaudeData)) {
          const filtered = superClaudeData.filter(c => !excludedContributors.includes(c.login));
          const detailed = await fetchContributorDetails(filtered);
          setSuperClaudeContributors(detailed);
        }

        const websiteRes = await fetch('https://api.github.com/repos/SuperClaude-Org/SuperClaude_Website/contributors');
        const websiteData = await websiteRes.json();
        if (Array.isArray(websiteData)) {
          const filtered = websiteData.filter(c => !excludedContributors.includes(c.login));
          const detailed = await fetchContributorDetails(filtered);
          setWebsiteContributors(detailed);
        }
      } catch (error) {
        console.error("Failed to fetch contributors:", error);
      }
    }

    fetchContributors();
  }, []);

  const ContributorList = ({ contributors }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.id} contributor={contributor} />
      ))}
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Contributors
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-light-text/80 dark:text-dark-text/80">
            The people who make SuperClaude possible.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">SuperClaude_Framework</h3>
          {superClaudeContributors.length > 0 ? (
            <ContributorList contributors={superClaudeContributors} />
          ) : (
            <p className="text-light-text/80 dark:text-dark-text/80">Loading contributors...</p>
          )}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">SuperClaude_Website</h3>
          {websiteContributors.length > 0 ? (
            <ContributorList contributors={websiteContributors} />
          ) : (
            <p className="text-light-text/80 dark:text-dark-text/80">Loading contributors...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContributorsPage;
