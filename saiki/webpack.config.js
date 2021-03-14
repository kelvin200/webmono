const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const zopfli = require('@gfx/zopfli')
const CompressionPlugin = require('compression-webpack-plugin')

// const MODE = 'production'
const MODE = 'development'

module.exports = {
  mode: MODE,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
    modules: [path.resolve(__dirname, '../node_modules')],
    plugins: [new TsconfigPathsPlugin()],
    // fallback: {
    //   crypto: false,
    // },
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')],
  },
  devtool: MODE === 'development' ? 'inline-source-map' : undefined,
  plugins:
    MODE === 'production'
      ? [
          new CompressionPlugin({
            compressionOptions: {
              numiterations: 15,
            },
            algorithm(input, compressionOptions, callback) {
              return zopfli.gzip(input, compressionOptions, callback)
            },
          }),
        ]
      : [],
  entry: {
    // text: './src/webc/text.tsx',
    // markdown: './src/webc/markdown.tsx',
    // 'redux-hooks': './src/webc/redux-hooks.tsx',
    // 'redux-rxjs': './src/webc/redux-rxjs.tsx',
    // 'reactive-rxjs': './src/webc/reactive-rxjs.tsx',
    // 'reactive-kefir': './src/webc/reactive-kefir.tsx',
    // 'redux-kefir': './src/webc/redux-kefir.tsx',
    // text_s: {
    //   import: './src/webc/text.webc.tsx',
    //   dependOn: 'vendors',
    // },
    // text_s2: {
    //   import: './src/webc/text2.webc.tsx',
    //   dependOn: 'vendors',
    // },
    // vendors: ['preact', 'goober', 'wouter-preact'],
    // vendorsA: ['preact'],
    // vendorsB: ['goober'],
    // vendorsC: ['wouter-preact'],
    // vendors: ['preact', 'goober', 'wouter-preact', 'preact-custom-element', 'markdown-to-jsx'],
    bundle: './client.tsx',
    // bundle: {
    //   import: './client.tsx',
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
