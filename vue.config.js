module.exports = {
    outputDir: './dist',
    publicPath: './',
    assetsDir: process.env.NODE_ENV === 'production' ? './assets' : './'  
  }