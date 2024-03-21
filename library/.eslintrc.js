module.exports = {
  extends: '../.eslintrc.js',
  overrides: [
    {
      files: ['types/formik.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['types/handle-rest-error.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}
