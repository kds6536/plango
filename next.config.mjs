/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, 'hooks');
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
}

export default nextConfig
