const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getCssLoaderConfig(env) {
  return [
    env === 'development'
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          },
        },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        // 是否开启css Modules
        modules: false,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
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
}

module.exports = function getRulesConfig(env) {
  return [
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
          exclude: path.resolve(__dirname, '../node_modules'),
          include: path.resolve(__dirname, '../src'),
          // 默认babel配置，优先级没有babelrc等配置高
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              // 模块热替换
              'react-hot-loader/babel',
              // class 转换
              '@babel/plugin-proposal-class-properties',
              // 装饰器模式支持
              ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
              // TODO 有了tree shaking之后还需要按需加载插件吗？
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
          test: /\.css/,
          use: [...getCssLoaderConfig(env)],
        },
        {
          test: /\.less/,
          use: [
            ...getCssLoaderConfig(env),
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  // 自定义样式
                  modifyVars: {},
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
  ];
};
