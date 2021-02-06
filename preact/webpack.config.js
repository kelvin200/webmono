const path = require('path')
const zopfli = require('@gfx/zopfli')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  // devtool: 'inline-source-map',
  // devtool: false,
  // plugins: [new webpack.SourceMapDevToolPlugin({})],
  entry: {
    text: './src/webc/text.tsx',
    // markdown: './src/webc/markdown.tsx',
    'redux-hooks': './src/webc/redux-hooks.tsx',
    'reactive-kefir': './src/webc/reactive-kefir.tsx',
    'redux-rxjs': './src/webc/redux-rxjs.tsx',
    'redux-kefir': './src/webc/redux-kefir.tsx',
    'reactive-rxjs': './src/webc/reactive-rxjs.tsx',
    // text_s: {
    //   import: './src/webc/text.webc.tsx',
    //   dependOn: 'vendors',
    // },
    // text_s2: {
    //   import: './src/webc/text2.webc.tsx',
    //   dependOn: 'vendors',
    // },
    // vendors: ['preact', 'goober', 'wouter-preact', 'preact-custom-element', 'markdown-to-jsx'],
    bundle: './index.tsx',
    // bundle: {
    //   import: './index.tsx',
    //   dependOn: 'vendors',
    // },
  },
  output: {
    filename: 'keyweb-[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      compressionOptions: {
        numiterations: 15,
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback)
      },
    }),
  ],
}
