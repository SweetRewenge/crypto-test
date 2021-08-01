module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.coincap.io',
        ws: true,
        secure:false,
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api/': '/v2/',
        },
      },
    }
  }
}
