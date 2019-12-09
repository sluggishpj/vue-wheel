const SentryCliPlugin = require('@sentry/webpack-plugin')

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
      // 设置环境变量
      config.plugin('webpack.DefinePlugin').use(webpack.DefinePlugin, [
        {
          'process.env.VERSION': JSON.stringify(process.env.VERSION)
        }
      ])

      // 设置上传sourcemap
      config.plugin('sentryCli').use(SentryCliPlugin, [
        {
          include: '.',
          ignoreFile: '.sentrycliignore',
          ignore: ['node_modules'],
          configFile: 'sentry.properties'
        }
      ])
    })
  }
}
