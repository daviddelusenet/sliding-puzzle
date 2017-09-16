const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const BaseConfig = require('./base');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { resolve } = require('path');

module.exports = function(env) {
  return WebpackMerge(BaseConfig(), {
    entry: {
      app: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.js'
        // the entry point of our app
      ]
    },
    devServer: {
      hot: true, // enable HMR on the server
      inline: true,
      contentBase: resolve(__dirname, './../dist'), // `__dirname` is root of the project
      publicPath: '/js/',
      port: 3000
    },
    devtool: 'eval',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 2,
                localIdentName: '[local]___[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => {
                  return [
                    require('autoprefixer')({
                      browsers: 'last 10 versions'
                    })
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: ['node_modules/foundation-sites/scss', 'src/styles']
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      // enable HMR globally
      new Webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // Browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3100,
          // Proxy the Webpack Dev Server endpoint through BrowserSync
          proxy: 'http://localhost:3000',
          open: true
        },
        // Plugin options
        {
          // Prevent BrowserSync from reloading the page and let Webpack Dev Server take care of this
          reload: false
        })
    ]
  });
};
