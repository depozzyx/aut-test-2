module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  localeDetection: false,
  logBuild: false,
  loadLocaleFrom: (lang, ns) =>
    import(`/.locales/${lang}/${ns}.json`).then((m) => m.default),
  pages: {
    '*': ['inputs', 'error', 'validation', 'routing', 'common', 'auth', 'modal-message'],
    '/auth/sign-in': ['error', 'validation', 'inputs', 'auth'],
    '/auth/reset-password': ['error', 'validation', 'inputs', 'auth'],
    '/auth/change-password': ['error', 'validation', 'inputs', 'auth'],
  },
}
