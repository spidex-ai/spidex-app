import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['twitter-api-v2'],
  },
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
    domains: ['cdn.spidex.ag'],
  },
};

export default nextConfig;
