import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import typescript from "rollup-plugin-typescript";


export default {
  // 模块名称
  moduleName: 'rollup-demo',
  // 入口文件
  input: 'src/index.tsx',
  // 输出文件
  output: [
    {
      name: 'rollup-demo',
      format: 'es',
      file: 'es/index.js'
    },
    {
      name: 'rollup-demo',
      format: 'umd',
      file: 'lib/index.js'
    }
  ],
  //外部模块配置
  plugins: [
    typescript(),
    // 别名
    alias({
      resolve: ['.tsx', '.jsx', '.ts', '.js']
    }),
    // 通知rollup如何查找外部模块
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      }
    }),
    // babel转换
    babel({
      exclude: '../node_modules/**',
      include: '../src',
      runtimeHelpers: true
    }),
    // 将CommonJS转为ES6模块
    commonjs({
      include: '../node_modules/**'
    }),
    postcss({
      extract: true,
      extensions: ['.less']
    })
  ]
}
