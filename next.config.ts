import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Set basePath and assetPrefix for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/webdev-tutor' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/webdev-tutor/' : '',
};

export default nextConfig;
