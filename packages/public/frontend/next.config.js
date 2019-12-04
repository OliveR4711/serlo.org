const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const webpack = require('webpack')
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withCSS({
  target: 'serverless',
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return require('./package.json').version
  },
  ...withImages(
    withBundleAnalyzer({
      webpack: config => {
        // for multiroot support we need to overwrite one specific file
        // doing it with webpack
        const regex = /node_modules(\\|\/)next(\\|\/)dist(\\|\/)client(\\|\/)index.js/
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(regex, function(resource) {
            resource.resource = resource.resource.replace(
              regex,
              path.join(
                'packages',
                'public',
                'frontend',
                'patch',
                'next',
                'dist',
                'client',
                'index.js'
              )
            )
          })
        )
        return config
      }
    })
  )
})