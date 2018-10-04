var path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watch: false,
  watchOptions: {
    aggregateTimeout: 3000, // 编译的超时时间，单位：毫秒
    poll: 30 // 扫描项目的间隔时间，单位：秒
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 以下是HtmlWebpackPlugin的配置
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: './index.html',
      hash: true
    })
  ]
};