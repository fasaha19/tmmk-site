/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: false,
    domains: ['members.tmmk.info','dummyimage.com'],
}
}

module.exports = nextConfig
