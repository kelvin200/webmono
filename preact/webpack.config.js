const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: {
    text: './src/components/text.tsx',
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
