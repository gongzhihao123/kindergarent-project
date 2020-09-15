const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',

  // baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
  outputDir: 'dist',

  assetsDir: 'assets',
  productionSourceMap: false,
  lintOnSave: true,

  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '127.0.0.1',
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '': {
        /* 目标代理服务器地址 */
        target: 'http://58.133.87.118:8080',
        ws: true,
        /* 允许跨域 */
        changeOrigin: true
        // pathRewrite: {
        //   '^portal-server': '/portal-server'
        // }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
