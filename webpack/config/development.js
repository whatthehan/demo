const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getRulesConfig = require('./rules');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'jarvis.[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    // // 当contentBase内容变更后刷新页面
    watchContentBase: true,
    // 允许访问本地服务的白名单
    allowedHosts: [],
    // 开启GZIP压缩
    compress: true,
    // 控制台不显示HMR日志
    clientLogLevel: 'none',
    // 是否绕过主机检查
    disableHostCheck: false,
    // 在所有HTTP响应中增加首部内容
    headers: {},
    // 指定host
    host: '0.0.0.0',
    // 开启模块热替换
    hot: true,
    // 热更新是否刷新页面
    hotOnly: false,
    // 开启HTTPS
    https: false,
    // dev模式
    inline: true,
    // 防止客户端被注入
    // injectClient: false,
    // 惰性模式，只有在请求时才会编译包，不监听任何改动
    // lazy: false,
    // 是否自动打开浏览器
    open: false,
    // 构建错误后是否全屏显示错误信息
    overlay: true,
    // 默认端口号
    port: 3000,
    // API代理
    proxy: {},
    // 除初始启动信息外任何内容都不需要打印在控制台
    quiet: false,
    // 设置服务器和客户端数据传输模式 （实验性API）
    transportMode: 'ws',
    // 是否允许使用本地IP打开
    useLocalIp: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: getRulesConfig('development'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
};
