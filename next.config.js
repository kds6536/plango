const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn('⚠️  NEXT_PUBLIC_API_URL 환경변수가 설정되어 있지 않습니다. 기본값 http://localhost:3001 이 사용됩니다.');
    }
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig; 