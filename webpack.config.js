const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = () => {
   return {
      entry: './src/index.js',
      output: {
         filename: 'main.js',
         path: path.resolve(__dirname, 'dist'),
         publicPath: '/dist'
      },
      devServer: {
         static: path.join(__dirname),
         compress: true,
         port: 4200,
      },
      watchOptions: {
         aggregateTimeout: 8000,
      },
      plugins: [
         new NodePolyfillPlugin()
      ]
   }
}
