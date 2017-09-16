const Webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const BaseConfig = require('./base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function(env) {
  return WebpackMerge(BaseConfig(), {
    entry: {
      app: './index.js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 2,
                  localIdentName: '[local]___[hash:base64]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: ['node_modules/foundation-sites/scss', 'src/styles']
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new Webpack.optimize.ModuleConcatenationPlugin(),
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.min.js',
        minChunks (module) {
          return module.context && module.context.indexOf('node_modules') >= 0;
        }
      }),
      new Webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }),
      new Webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new Webpack.HashedModuleIdsPlugin(),
      new ExtractTextPlugin({
        filename: '../css/app.min.css',
        allChunks: true
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  })
};
