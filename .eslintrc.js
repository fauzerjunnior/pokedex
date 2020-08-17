module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "airbnb-base", "prettier"
  ],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser:"babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-console": "off",
    "camelcase": "off", 
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    "prettier/prettier": "error"
  },
};
