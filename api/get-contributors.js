// In-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

export default async function handler(req, res) {
  const now = Date.now();

  // Check if cache is still valid
  if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
    res.setHeader('X-Cache-Status', 'hit');
    return res.status(200).json(cache.data);
  }

  const excludedContributors = ['mithun50', 'NomenAK', 'google-labs-jules[bot]'];
  const repos = [
    'SuperClaude-Org/SuperClaude_Framework',
    'SuperClaude-Org/SuperClaude_Website',
  ];

  try {
    const contributorPromises = repos.map(repo =>
      fetch(`https://api.github.com/repos/${repo}/contributors`)
    );
    const contributorResponses = await Promise.all(contributorPromises);

    for (const response of contributorResponses) {
      if (!response.ok) {
        return res.status(response.status).json({
          error: `Failed to fetch from GitHub: ${response.statusText}`,
        });
      }
    }

    const contributorData = await Promise.all(
      contributorResponses.map(response => response.json())
    );

    const allContributors = {};
    contributorData.forEach((repoContributors, index) => {
      if (Array.isArray(repoContributors)) {
        repoContributors
          .filter(c => !excludedContributors.includes(c.login))
          .forEach(c => {
            if (!allContributors[c.login]) {
              allContributors[c.login] = {
                login: c.login,
                avatar_url: c.avatar_url,
                html_url: c.html_url,
                contributions: 0,
                repos: [],
              };
            }
            allContributors[c.login].contributions += c.contributions;
            allContributors[c.login].repos.push(repos[index]);
          });
      }
    });

    const detailedContributorPromises = Object.values(allContributors).map(async (contributor) => {
      const response = await fetch(`https://api.github.com/users/${contributor.login}`);
      if (!response.ok) {
        // Return basic data if detail fetch fails
        return contributor;
      }
      const data = await response.json();
      return {
        ...contributor,
        name: data.name || contributor.login,
      };
    });

    const contributors = await Promise.all(detailedContributorPromises);

    // Sort contributors by total contributions
    contributors.sort((a, b) => b.contributions - a.contributions);

    const responseData = {
      superClaudeContributors: contributors.filter(c =>
        c.repos.includes('SuperClaude-Org/SuperClaude_Framework')
      ),
      websiteContributors: contributors.filter(c =>
        c.repos.includes('SuperClaude-Org/SuperClaude_Website')
      ),
    };

    // Update cache
    cache = {
      data: responseData,
      timestamp: now,
    };

    res.setHeader('X-Cache-Status', 'miss');
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}
