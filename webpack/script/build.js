'use strict';

const chalk = require('chalk');

const webpack = require('webpack');
const WebpacDevServer = require('webpack-dev-server');

const webpackConfig = require('../config/webpack.config');
const devServerConfig = require('../config/webpackDevServer.config');

process.env.NODE_ENV = 'production';

const config = webpackConfig('production');

const compiler = webpack(config);

compiler.run();
