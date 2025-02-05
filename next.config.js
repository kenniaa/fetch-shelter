// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-take-home.fetch.com',
        port: '',
        pathname: '/dog-images/**',
        search: '',
      },
    ],
  },
}

module.exports = nextConfig
