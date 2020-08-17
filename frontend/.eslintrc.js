module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb', 
    'eslint-config-prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react', 'eslint-plugin-prettier'
  ],
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'camelcase': 'off', 
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-curly-newline': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off'
  },
};