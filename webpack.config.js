var path = require('path')

module.exports = {
  // mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['./node_modules'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  // devtool: 'inline-source-map',
  // devtool: false,
  // plugins: [new webpack.SourceMapDevToolPlugin({})],
  entry: {
    'preact-vendors': [
      'preact',
      'goober',
      'wouter-preact',
      'preact-custom-element',
      'preact-helmet',
    ],
  },
  output: {
    filename: '[name].js',
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
