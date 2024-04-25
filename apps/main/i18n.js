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
    '/cabinet/dashboard': ['user', 'routing', 'campaigns', 'agents'],
    '/cabinet/calls': ['user', 'routing'],
    '/cabinet/campaigns-list': ['user', 'routing', 'campaigns'],
    '/cabinet/agents-list': ['user', 'routing', 'agents'],
    '/cabinet/leads-list': ['user', 'routing', 'leads-list'],
    '/cabinet/import-leads': ['user', 'routing', 'import-leads', 'leads-list'],
    '/cabinet/create-agent': ['user', 'routing', 'agents'],
    '/cabinet/settings': ['user', 'routing', 'settings', 'validation'],
  },
}
