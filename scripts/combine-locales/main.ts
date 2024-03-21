// eslint-disable-next-line @typescript-eslint/no-var-requires
const combineLocales = require('./combine.ts')

combineLocales({
  from: ['./apps/main/locales'],
  to: './apps/main/.locales',
})
