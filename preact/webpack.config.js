const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  entry: {
    text: './src/components/text.tsx',
    text2: './src/components/text2.tsx',
    text3: './src/components/text3.tsx',
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
