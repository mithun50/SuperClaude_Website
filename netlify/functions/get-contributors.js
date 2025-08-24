// In-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

exports.handler = async (event, context) => {
  const fetch = (await import('node-fetch')).default;
  const now = Date.now();

  // Check if cache is still valid
  if (cache.data && (now - cache.timestamp < CACHE_DURATION)) {
    return {
      statusCode: 200,
      body: JSON.stringify(cache.data),
      headers: {
        'Content-Type': 'application/json',
        'X-Cache-Status': 'hit',
      },
    };
  }

  const excludedContributors = ['mithun50', 'NomenAK', 'google-labs-jules[bot]'];
  const repos = [
    'SuperClaude-Org/SuperClaude_Framework',
    'SuperClaude-Org/SuperClaude_Website',
  ];

  try {
    const contributorPromises = repos.map(repo => fetch(`https://api.github.com/repos/${repo}/contributors`));
    const contributorResponses = await Promise.all(contributorPromises);

    for (const res of contributorResponses) {
      if (!res.ok) {
        // If any GitHub API call fails, return an error
        return {
          statusCode: res.status,
          body: JSON.stringify({ error: `Failed to fetch from GitHub: ${res.statusText}` }),
        };
      }
    }

    const contributorData = await Promise.all(contributorResponses.map(res => res.json()));

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
      const res = await fetch(`https://api.github.com/users/${contributor.login}`);
      if (!res.ok) {
        // Silently fail for individual user details, or handle error as needed
        return contributor; // Return basic data if detail fetch fails
      }
      const data = await res.json();
      return {
        ...contributor,
        name: data.name || contributor.login,
      };
    });

    const contributors = await Promise.all(detailedContributorPromises);

    // Sort contributors by total contributions
    contributors.sort((a, b) => b.contributions - a.contributions);

    const responseData = {
        superClaudeContributors: contributors.filter(c => c.repos.includes('SuperClaude-Org/SuperClaude_Framework')),
        websiteContributors: contributors.filter(c => c.repos.includes('SuperClaude-Org/SuperClaude_Website')),
    };

    // Update cache
    cache = {
      data: responseData,
      timestamp: now,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
      headers: {
        'Content-Type': 'application/json',
        'X-Cache-Status': 'miss',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An unexpected error occurred.' }),
    };
  }
};
