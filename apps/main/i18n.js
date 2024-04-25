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
    '/dashboard/active-campaigns': ['user', 'routing', 'campaigns', 'agents'],
    '/campaigns/list': ['user', 'routing', 'campaigns'],
    '/agents/list': ['user', 'routing', 'agents'],
    '/leads/list': ['user', 'routing', 'leads-list'],
    '/leads/import': ['user', 'routing', 'import-leads', 'leads-list'],
    '/agents/create': ['user', 'routing', 'agents'],
    '/settings/account-management': ['user', 'routing', 'settings', 'validation'],
  },
}
