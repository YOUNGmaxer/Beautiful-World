const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',

  // 方便开发环境查看源代码和调试
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    // dev server 的配置要启动 hot，或者在命令行中带参数开启
    hot: true
  },

  plugins: [
    // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // Hot Module Replacement 的插件
    new webpack.HotModuleReplacementPlugin()
  ]
});
