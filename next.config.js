/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  },
}

module.exports = nextConfig
