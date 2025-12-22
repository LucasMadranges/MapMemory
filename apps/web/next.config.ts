import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN,
  },
  turbopack: {
    root: '../..',
  },
  output: 'standalone',
};

export default nextConfig;
