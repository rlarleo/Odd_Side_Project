const withPlugins = require('next-compose-plugins');

const nextConfig = {
  // distDir: '../../dist/functions/next'
  images: {
    domains: ['pbs.twimg.com', 'localhost'],
  },
};

module.exports = withPlugins([], nextConfig);
