import withPWA from 'next-pwa'
import createNextIntlPlugin from 'next-intl/plugin'

const env = process.env.NODE_ENV
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: env === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagsapi.com',
        pathname: '/**',
      },
    ],
  }
}

const withNextIntl = createNextIntlPlugin()
const configWithPWA =  withPWA({
  dest: 'public',
  register: env === 'production',
  disable: env === 'development' || env === 'test',
  skipWaiting: true,
})(nextConfig)

export default withNextIntl(configWithPWA)
