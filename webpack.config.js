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
      module: {
         rules: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     plugins: ['@babel/plugin-syntax-dynamic-import'],
                  },
               },
            },
         ],
      },
      plugins: [
         new NodePolyfillPlugin()
      ]
   }
}
