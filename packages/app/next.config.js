const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@manufarfaro/sl-contracts': path.resolve(__dirname, '../contracts/dist/src/index.js'),
    }

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  },
}
