module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-anonymous-default-export': 'off'
  },
  ignorePatterns: ['**/*']
};
