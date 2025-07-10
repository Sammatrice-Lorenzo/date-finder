import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

module.exports = async () => ({
  ...(await createJestConfig({
    testEnvironment: 'jsdom',
    rootDir: 'src',
  })()),
  // https://github.com/vercel/next.js/issues/40183
  transformIgnorePatterns: ['node_modules/(?!next-intl)/'],
})
