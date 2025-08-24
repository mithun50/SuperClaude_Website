import React, { useState, useEffect } from 'react';
import ContributorCard from '../components/ContributorCard';
import { GradientText } from '../components/ui/gradient-text';

function ContributorsPage() {
  const [superClaudeContributors, setSuperClaudeContributors] = useState([]);
  const [websiteContributors, setWebsiteContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const res = await fetch('/.netlify/functions/get-contributors');
        if (!res.ok) {
          throw new Error(`Failed to fetch contributors: ${res.statusText}`);
        }
        const data = await res.json();
        setSuperClaudeContributors(data.superClaudeContributors || []);
        setWebsiteContributors(data.websiteContributors || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  const ContributorList = ({ contributors }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.login} contributor={contributor} />
      ))}
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <GradientText className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
            Contributors
          </GradientText>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-light-text/80 dark:text-dark-text/80">
            The people who make SuperClaude possible.
          </p>
        </div>

        {loading && <p className="text-center mt-8">Loading contributors...</p>}
        {error && <p className="text-center mt-8 text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="mt-12">
              <GradientText className="text-2xl font-bold mb-4">SuperClaude_Framework</GradientText>
              {superClaudeContributors.length > 0 ? (
                <ContributorList contributors={superClaudeContributors} />
              ) : (
                <p className="text-light-text/80 dark:text-dark-text/80">No contributors found.</p>
              )}
            </div>

            <div className="mt-12">
              <GradientText className="text-2xl font-bold mb-4">SuperClaude_Website</GradientText>
              {websiteContributors.length > 0 ? (
                <ContributorList contributors={websiteContributors} />
              ) : (
                <p className="text-light-text/80 dark:text-dark-text/80">No contributors found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContributorsPage;
