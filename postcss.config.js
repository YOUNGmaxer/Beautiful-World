// const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: {
    // 自动添加 css 前缀
    // 注意这里如果没有添加版本范围，则不会生效
    autoprefixer: { browsers: ['last 2 versions', 'iOS >= 8'] }
  }
}
