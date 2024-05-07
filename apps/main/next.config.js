/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
const withTM = require('next-transpile-modules')([
  '@peiko/styles',
  '@peiko/hooks',
  '@peiko/components',
  '@peiko/utils',
])

module.exports = () =>
  withTM(
    nextTranslate({
      reactStrictMode: false,
      typescript: {
        ignoreBuildErrors: false,
      },
      compiler: {
        styledComponents: true,
      },
      webpack(config) {
        return config
      },
      async redirects() {
        return [
          {
            source: '/',
            destination: '/cabinet/dashboard/active-campaigns',
            permanent: true,
          },
        ]
      },
    }),
  )
