import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
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
