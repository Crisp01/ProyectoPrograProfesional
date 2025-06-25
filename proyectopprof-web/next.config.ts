import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // Necessary to deploy in Deno deploy
  images: {
    // Allow images from all banks
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.bancochile.cl',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.bciplus.cl',
        pathname: '/storages/loyalty/campaigns-images/**',
      },
    ],
  },
};

export default nextConfig;
