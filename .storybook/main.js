module.exports = {
  stories: ['../stories/**/*.stories.@(tsx)'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: {
        loader: 'base64-inline-loader',
      },
    })

    return config
  },
}
