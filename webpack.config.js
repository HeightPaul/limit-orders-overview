const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = (env, argv) => {
   return {
      mode: 'none',
      entry: './src/index.js',
      output: {
         filename: 'main.js',
         path: path.resolve(__dirname, 'dist'),
      },
      cache: argv.mode !== 'development',
      devServer: {
         static: path.join(__dirname, 'dist'),
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
   };
};
