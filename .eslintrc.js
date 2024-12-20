// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'react-native'],
  globals: {
    __dirname: true,
  },
  ignorePatterns: ['graphql.tsx'],
  rules: {
    // Show Prettier issues as ESLint errors or warnings
    'prettier/prettier': 'error',

    // Styling & Conventions
    'react-native/no-unused-styles': 1,
    'react-native/sort-styles': [
      'error',
      'asc',
      {
        ignoreClassNames: false,
        ignoreStyleProperties: false,
      },
    ],
    'react-native/no-inline-styles': 'error',

    // Warn about console.log statements
    'no-console': 'warn',

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};
