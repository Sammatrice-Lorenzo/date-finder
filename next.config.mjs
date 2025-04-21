import withPWA from 'next-pwa'

const env = process.env.NODE_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: env === 'production',
  },
}

export default withPWA({
  dest: 'public',
  register: env === 'production',
  disable: env === 'development' || env === 'test',
  skipWaiting: true,
})(nextConfig)
