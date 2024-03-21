module.exports = {
  extends: '../../.eslintrc.js',
  overrides: [
    {
      files: ['pages/_app.tsx', 'pages/_document.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['next.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['src/features/common/error/utils/handle-rest-error.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}
