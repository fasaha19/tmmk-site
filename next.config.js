/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['members.tmmk.info','dummyimage.com'],
}
}

module.exports = nextConfig
