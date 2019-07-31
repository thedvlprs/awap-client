module.exports = {
  publicPath: '',
  outputDir: 'docs',
  productionSourceMap: false,
  pages: {
    index: {
      entry: './src/main.js',
      template: './src/index.pug'
    }
  }
}