module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pwa: {
    name: 'vue-wheel',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW'
  }
}
