/**
 * Lightweight dev server for the /api/get-contributors endpoint.
 *
 * Vercel runs serverless functions from /api at deploy time, but the CRA
 * webpack dev server (npm start) only serves static assets. This Express
 * server mirrors the Vercel function so /api/* works locally.
 *
 * src/setupProxy.js forwards /api requests from port 3000 to this server
 * on port 3001. Run it in a separate terminal alongside `npm start`:
 *
 *   node scripts/dev-api.js
 */
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// In-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

app.use(cors());

app.get('/api/get-contributors', async (req, res) => {
  const now = Date.now();

  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    res.setHeader('X-Cache-Status', 'hit');
    return res.status(200).json(cache.data);
  }

  const excludedContributors = ['mithun50', 'NomenAK', 'google-labs-jules[bot]'];
  const repos = [
    'SuperClaude-Org/SuperClaude_Framework',
    'SuperClaude-Org/SuperClaude_Website',
  ];

  try {
    const contributorPromises = repos.map((repo) =>
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
      contributorResponses.map((response) => response.json())
    );

    const allContributors = {};
    contributorData.forEach((repoContributors, index) => {
      if (Array.isArray(repoContributors)) {
        repoContributors
          .filter((c) => !excludedContributors.includes(c.login))
          .forEach((c) => {
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

    const detailedContributorPromises = Object.values(allContributors).map(
      async (contributor) => {
        const response = await fetch(
          `https://api.github.com/users/${contributor.login}`
        );
        if (!response.ok) {
          return contributor;
        }
        const data = await response.json();
        return {
          ...contributor,
          name: data.name || contributor.login,
        };
      }
    );

    const contributors = await Promise.all(detailedContributorPromises);
    contributors.sort((a, b) => b.contributions - a.contributions);

    const responseData = {
      superClaudeContributors: contributors.filter((c) =>
        c.repos.includes('SuperClaude-Org/SuperClaude_Framework')
      ),
      websiteContributors: contributors.filter((c) =>
        c.repos.includes('SuperClaude-Org/SuperClaude_Website')
      ),
    };

    cache = {
      data: responseData,
      timestamp: now,
    };

    res.setHeader('X-Cache-Status', 'miss');
    return res.status(200).json(responseData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An unexpected error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Dev API server running on http://localhost:${PORT}`);
});
