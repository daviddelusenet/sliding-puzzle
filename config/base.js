const webpack = require('webpack');
const { resolve } = require('path');
const context = resolve(__dirname, './../src');

module.exports = function() {
  return {
    context,
    output: {
      path: resolve(__dirname, './dist/js'),
      filename: '[name].min.js',
      publicPath: '/js/'
    },
    resolve: {
      modules: ['node_modules', 'src/app/components'],
      alias: {
        'TweenLite': resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        'TweenMax': resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        'TimelineLite': resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        'TimelineMax': resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        'ScrollMagic': resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      }
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
