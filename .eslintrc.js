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
    mocha: true
  },
  rules: {
    "no-new": 0,
    "no-console": 0,
    "class-methods-use-this": 0
  }
}
