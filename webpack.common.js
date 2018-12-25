const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(myPath) {
  return path.resolve(__dirname, myPath);
}

module.exports = {
  entry: {
    main: './src/main.js'
  },

  resolve: {
    alias: {
      Views: resolve('./src/views'),
      Components: resolve('./src/components')
    }
  },

  module: {
    rules: [
      // 为了使用单文件组件，需要引入 vue-loader
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(css)/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(svg|ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      // 引用字体文件需要 url-loader
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'url-loader?limit=100000',
        exclude: /(node_modules)/
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Beautiful World',
      filename: 'index.html',
      template: './src/assets/template.html'
    }),
    // 将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    new VueLoaderPlugin()
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
