/**
 * node core
*/
const path = require('path')

/**
 * dependencies
*/
const HtmlWebapckPlugin = require('html-webpack-plugin')   // html模板
const MIiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css，如果有必要多个可以require多个抽离多个文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')  // 压缩js

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build')
    },
    compress: true,
    port: 9000
  },
  mode: 'production',   // production development
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebapckPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true
    }),
    new MIiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MIiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          MIiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}