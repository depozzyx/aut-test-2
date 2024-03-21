module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  localeDetection: false,
  logBuild: false,
  loadLocaleFrom: (lang, ns) =>
    import(`./.locales/${lang}/${ns}.json`).then((m) => m.default),
  pages: {
    '*': ['inputs', 'error', 'validation', 'auth'],
    '/auth/sign-up': ['tutorial'],
  },
}
