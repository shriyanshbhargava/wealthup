/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "admin.wealthup.me",
      "api.wealthup.me",
      'd13dxmyrj2wi5p.cloudfront.net',
    ],
    remotePatterns: [
      {
        protocol: "https", // Allow only HTTPS images for security
        hostname: "**",    // Match any hostname
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    nextScriptWorkers: true,
  }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
