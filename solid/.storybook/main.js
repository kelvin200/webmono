const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  // addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async options => {
    return {
      ...options,
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          {
            runtime: 'automatic',
            importSource: 'preact',
          },
        ],
      ],
    }
  },
}
