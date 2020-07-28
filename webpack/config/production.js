const path = require('path');

const { default: ESBuildPlugin } = require('esbuild-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getRulesConfig = require('./rules');

module.exports = {
  // 生产模式
  mode: 'production',
  // 入口
  entry: path.resolve(__dirname, '../src/index.js'),
  // 输出配置
  output: {
    filename: 'jarvis.[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
  },
  // 构建失败后退出流程
  bail: true,
  // 不生成map文件
  devtool: 'none',
  // 优化
  optimization: {
    minimize: true,
    // 使用esbuild-webpack-plugin做压缩
    minimizer: [
      new ESBuildPlugin({
        optimize: true,
      }),
    ],
  },
  // 解析配置
  resolve: {
    // 指定第三方模块存储位置
    modules: [path.resolve(__dirname, '../node_modules')],
    // 指定文件后缀 频率高的放前面
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  //
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: getRulesConfig('production'),
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin({ paths: ['dist'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'jarvis.[hash:8].css',
    }),
  ],
};
