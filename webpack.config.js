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
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
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