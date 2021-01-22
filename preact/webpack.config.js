const path = require('path')

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
  entry: {
    text: './src/webc/text.webc.tsx',
    bundle: './index.tsx',
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
