module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  localeDetection: false,
  logBuild: false,
  loadLocaleFrom: (lang, ns) =>
    import(`/.locales/${lang}/${ns}.json`).then((m) => m.default),
  pages: {
    '*': ['inputs', 'error', 'common', 'modal-message', 'notifications', 'routing'],
    '/auth/sign-in': ['error', 'validation', 'inputs', 'auth'],
    '/auth/forgot-password': ['error', 'validation', 'inputs', 'auth'],
    '/auth/reset-password': ['error', 'validation', 'inputs', 'auth'],
    '/cabinet/dashboard': ['user', 'routing'],
    '/cabinet/calls': ['user', 'routing'],
    '/cabinet/campaigns-list': ['user', 'routing', 'campaigns'],
  },
}
