'use strict';

const chalk = require('chalk');

const webpack = require('webpack');
const WebpacDevServer = require('webpack-dev-server');

const webpackConfig = require('../config/webpack.config');
const devServerConfig = require('../config/webpackDevServer.config');

process.env.NODE_ENV = 'development';

// 为Promise绑定默认拒绝事件
process.on('unhandledRejection', (err) => {
  throw err;
});

const config = webpackConfig('development');

const compiler = webpack(config);
const devServer = new WebpacDevServer(compiler, devServerConfig);

devServer.listen(devServerConfig.port, devServerConfig.host, (err) => {
  if (err) {
    return console.log(chalk.red(err));
  }

  console.log(chalk.cyan('starting the development server... \n'));
});
