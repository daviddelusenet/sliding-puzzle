const webpack = require('webpack');
const { resolve } = require('path');
const context = resolve(__dirname, './../src');

module.exports = function() {
  return {
    context,
    output: {
      path: resolve(__dirname, './../dist/js'),
      filename: '[name].min.js',
      publicPath: '/js/'
    },
    resolve: {
      modules: ['node_modules', 'src/app/components']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
};
