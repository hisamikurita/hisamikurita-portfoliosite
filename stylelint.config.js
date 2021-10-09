module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  ignoreFiles: ["./assets/scss/reset/**/*"],
  rules: {
    "at-rule-no-unknown": [true, { "ignoreAtRules": ["include", "use", "function", "return", "mixin", "each" , "for", "if", "else"] }],
  }
}
