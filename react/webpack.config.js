const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: {
    text: './src/mfe/text.tsx',
  },
  output: {
    filename: 'react-[name].js',
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
