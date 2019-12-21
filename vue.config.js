const format = require('date-fns/format')

const SentryCliPlugin = require('@sentry/webpack-plugin')
const webpack = require('./node_modules/webpack')

if (process.env.NODE_ENV === 'production') {
  if (!process.env.VERSION) {
    process.env.VERSION = format(new Date(), 'yyyy-MM-dd-hh-mm-ss')
  }
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '',
  pwa: {
    name: 'vue-wheel',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW'
  },

  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', () => {
      config.merge({
        devtool: false
      })
      const { VERSION } = process.env

      config.plugin('SourceMapDevToolPlugin').use(webpack.SourceMapDevToolPlugin, [
        {
          filename: 'sourcemaps/[name].[hash:8].js.map',
          publicPath: `https://sentry.io/api/0/organizations/xpj/releases/${VERSION}/files/`,
          fileContext: 'js'
        }
      ])

      // 设置上传 sourcemap
      config.plugin('sentryCli').use(SentryCliPlugin, [
        {
          release: VERSION,
          include: '/dist/sourcemaps',
          ignoreFile: '.sentrycliignore',
          ignore: ['node_modules', 'babel.config.js', 'vue.config.js'],
          configFile: 'sentry.properties',
          urlPrefix: '~/'
        }
      ])
    })
  }
}
