/**
 * Still commonJS require and module.exports
 * Not ES6 import / export
 */

const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// TODO check this require should still be here or ot
require('babel-polyfill')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const HappyPack = require('happypack')

/**
 * Different env variables
 */
const DEV_URLS = require('./config/dev.config.urls')
// const TEST_URLS = require('./config/test.config.urls')
// const PROD_URLS = require('./config/prod.config.urls')

/**
 * hash for version number : fetch from package.json version number as input
 */
const PACKAGE = require('./package.json')
let banner = PACKAGE.version

module.exports = env => {
  console.log('env', env)

  const { ifProd, ifTest, ifDev, ifNotProd } = getIfUtils(env)
  return {
    context: resolve('src'),
    entry: {
      app: ['babel-polyfill', './index.js'],
      vendor: ['react', 'react-dom', 'react-router', 'lodash']
    },

    // output tells webpack where to dump the files it has processed.
    // [name].[hash].js will output something like app.3531f6aad069a0e8dc0e.js
    output: {
      path: resolve('build'),
      filename: ifProd(`bundle-${banner}.[name].[hash].js`, '[name].js'),
      publicPath: '/'
    },

    // NOTE for slower builds but easier debug, change second param to source-map
    devtool: ifDev('cheap-eval-source-map'),
    resolve: {
      extensions: ['.css', '.js', '.jsx', '.json'],
      alias: {
        Components: resolve('src/components'),
        Containers: resolve('src/containers'),
        Reducers: resolve('src/reducers'),
        Utils: resolve('src/utils'),
        Images: resolve('src/images'),
        ToolBox: resolve('src/ToolBox')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            ifDev(
              'HappyPack/loader',
              { loader: 'babel-loader' }
            )
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|jpeg|png|gif|ico|eot|svg|ttf|woff|woff2|otf)$/,
          use: ['url-loader']
        }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      ifDev(new webpack.DefinePlugin(DEV_URLS)),
      // ifTest(new webpack.DefinePlugin(TEST_URLS)),
      // ifProd(new webpack.DefinePlugin(PROD_URLS)),
      // ifProd(new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks: Infinity,
      //   filename: '[name].[hash].js'
      // })),
      new HtmlWebpackPlugin({
        template: resolve('src', 'index.html'),
        filename: './index.html',
        hash: true,
        inject: true
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      require('precss'),

      ifDev(
            new HappyPack({
              loaders: [
                {
                  loader: 'babel-loader',
                  options: {
                    'presets': ['env', 'react'],
                    'plugins': [
                      'babel-plugin-root-import', 'transform-object-rest-spread', 'react-hot-loader/babel'
                    ]
                  }
                }
              ]
            })),
      new webpack.BannerPlugin(banner),

      // skip the emitting phase whenever there are errors while compiling.
      // This ensures that no assets are emitted that include errors
      ifNotProd(new webpack.NoEmitOnErrorsPlugin())
    ])
  }
}
