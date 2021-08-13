module.exports = {
  devServer: { // 解决跨域问题
    proxy: {
      '/api': {
        // target: 'http://api-toutiao-web.itheima.net',
        target: 'http://ttapi.research.itcast.cn/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  }
}
