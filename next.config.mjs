import withPWA from 'next-pwa';

const env = process.env.NODE_ENV 

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: env === 'development' || env === 'test'
  }
};

export default withPWA({
  dest: 'public',
  register: env === 'production',
  disable: env === 'development' || env === 'test',
  register: true,
  skipWaiting: true,
})(nextConfig)