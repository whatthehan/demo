const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const PnpPlugin = require('pnp-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const JarvisWebpackPlugin = require('webpack-jarvis');
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getDefaultCssLoader = (env) => {
  const styleLoader = env
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: true,
        },
      }
    : 'style-loader';

  return [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        // 之前的loader数量
        importLoaders: 1,
        // 开发环境生成map文件
        sourceMap: env,
        //   // 启用css modules
        // modules: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        // 命名
        ident: 'post-css',
        plugins: () => [
          require('autoprefixer'),
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ];
};

module.exports = function (env) {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    // 环境
    mode: env,
    // 生产环境下打包失败是退出流程
    bail: isProduction,
    // 开发环境生成map文件，生产环境下不生成map文件
    devtool: isProduction ? 'none' : 'cheap-module-source-map',
    // 入口文件
    entry: path.resolve(__dirname, '../src/index.js'),
    // 输出配置
    output: {
      filename: 'static/js/jarvis.[hash:8].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: './',
    },
    // 自定义优化
    optimization: {
      // 生产环境打自定义压缩插件
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          cache: true, // 开启缓存
          parallel: true, // 开启并行构建
          sourceMap: false, // 不需要map文件
        }),
      ],
    },
    // 解析配置
    resolve: {
      // 指定第三方模块存储位置
      modules: [path.resolve(__dirname, '../node_modules')],
      // 指定文件后缀 频率高的放前面
      extensions: ['.jsx', '.tsx', '.js', '.ts'],
      // 路径别名
      alias: {
        '@': path.resolve(__dirname, '../src'),
      },
      plugins: [
        /*
         * pnp-webpack-plugin可以解决require时过多的I/O操作
         * 通过建立一张记录 依赖版本关联 和 依赖与依赖 之间关系的映射表
         * 解析时跳过繁琐的查找过程，从而提升性能
         */
        PnpPlugin,
      ],
    },
    resolveLoader: {
      plugins: [PnpPlugin.moduleLoader(module)],
    },
    module: {
      rules: [
        {
          parser: {
            // 解析时禁用require.ensure
            requireEnsure: false,
          },
        },
        {
          oneOf: [
            /**
             * url-loader功能与file-loader类似
             * 当文件大小大于阈值时，将返回文件的base64编码
             */
            {
              test: /\.(bmp|gif|jpe?g|png)$/,
              use: {
                loader: 'url-loader',
                options: {
                  name: 'static/assets/[name].[hash:8].[ext]',
                  limit: 1024 * 10, // 设置阈值
                },
              },
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              // 开启转换结果缓存
              loader: 'babel-loader?cacheDirectory',
              // 默认排除node_modules
              exclude: path.resolve(__dirname, '../node_modules'),
              include: path.resolve(__dirname, '../src'),
              // babel 配置
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                  [
                    'import',
                    {
                      libraryName: 'antd',
                      libraryDirectory: 'es',
                      style: true,
                    },
                  ],
                ],
              },
            },
            {
              test: /\.css$/,
              use: getDefaultCssLoader(isProduction),
            },
            {
              test: /\.less$/,
              use: [
                ...getDefaultCssLoader(isProduction),
                {
                  loader: 'less-loader',
                  options: {
                    sourceMap: true,
                    lessOptions: {
                      javascriptEnabled: true,
                    },
                  },
                },
              ],
            },
            /**
             * file-loader
             * 解析除了js html json文件以外的类型
             */
            {
              loader: 'file-loader',
              exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/asset/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
      }),
      new CleanWebpackPlugin({
        paths: ['dist'],
      }),
      new FriendlyErrorWebpackPlugin(),
      // new JarvisWebpackPlugin({
      //   port: 1331,
      // }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/style/[name].[hash:8].css',
        }),
    ].filter(Boolean),
  };
};
