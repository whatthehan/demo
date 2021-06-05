import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

const pkg = require('../package.json');
const external = [
  'react',
  'react-dom',
  /^antd/,
  ...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }),
];

export default {
  input: 'src/index.tsx',
  output: [
    {
      format: 'cjs',
      dir: 'lib',
    },
    {
      format: 'es',
      dir: 'es',
    },
    {
      format: 'umd',
      name: pkg.name,
      dir: 'dist',
    },
  ],
  external: external,
  plugins: [
    resolve({
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      browser: true,
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      include: ['src/**/*'],
      exclude: '**/node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: false,
          },
        ],
        [
          'babel-plugin-import',
          {
            libraryName: 'antd',
            libraryDirectory: 'lib',
            style: 'css',
          },
        ],
      ],
    }),
    postcss({
      extensions: ['.css', '.less'],
      extract: true,
      modules: {
        auto: true,
      },
      use: [['less', { javascriptEnabled: true }]],
    }),
  ],
};
