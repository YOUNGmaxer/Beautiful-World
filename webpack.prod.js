const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// 不使用 UglifyJSPlugin 这个插件进行压缩，因此不支持 ES6 语法，构建会报错
// 现在使用 TerserPlugin 进行压缩 JS
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  entry: {
    main: './src/main.js'
  },

  optimization: {
    minimizer: [new TerserPlugin()]
  }

});
