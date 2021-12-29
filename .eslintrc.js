module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  ignorePatterns: ["**/vendor/*.js"],
  // add your custom rules here
  rules: {
    "object-shorthand": "off",
    "no-void": "off",
    "no-return-assign" : "off"
  }
}
