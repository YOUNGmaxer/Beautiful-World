module.exports = {
  extends: 'airbnb-base/legacy',
  parserOptions: {
    // For ES9 syntax
    ecmaVersion: 9,
    // support ES modules
    sourceType: 'module'
  },
  env: {
    // for new ES6 global variables
    es6: true,
    mocha: true,
    browser: true
  },
  rules: {
    "no-new": 0,
    "no-console": 0,
    "class-methods-use-this": 0,
    "no-param-reassign": 0,
    "no-empty-pattern": 0,
    "no-restricted-globals": 0,
    "no-underscore-dangle": 0,
    "no-restricted-syntax": 0
  }
}
