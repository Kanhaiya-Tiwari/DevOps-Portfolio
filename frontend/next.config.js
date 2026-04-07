/** @type {import('next').NextConfig} */

// Custom domain (info.buildwithkanha.shop) = serve from root, no basePath
// GitHub.io subpath = use /<repo-name> as basePath
const useCustomDomain = process.env.USE_CUSTOM_DOMAIN === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.replace(/^[^/]+\//, '') || 'portfolio-2026';
const basePath = useCustomDomain ? '' : `/${repoName}`;
const assetPrefix = useCustomDomain ? '' : `${basePath}/`;

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    domains: [],
    remotePatterns: [],
  },
}

module.exports = nextConfig

