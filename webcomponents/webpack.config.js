const path = require('path')
// const webpack = require('webpack')

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
    text: './src/webc/text.webc.tsx',
    text_s: {
      import: './src/webc/text.webc.tsx',
      dependOn: 'vendors',
    },
    vendors: ['preact', 'goober', 'wouter-preact', 'preact-custom-element'],
  },
  output: {
    filename: 'preact-[name].js',
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
}
