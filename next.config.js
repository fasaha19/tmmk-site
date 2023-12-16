/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["members.tmmk.info", "dummyimage.com", "picsum.photos"],
  },
};
module.exports = nextConfig;
