const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    library: 'ValueSource',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      compress: {
        dead_code: true
      },
      beautify: true,
      mangle: false
    })
  ]
};
