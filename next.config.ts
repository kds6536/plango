/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/plango', // 이 줄이 중요! (GitHub Pages 하위폴더용)
}
module.exports = nextConfig