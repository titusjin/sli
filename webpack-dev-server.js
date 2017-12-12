const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config.js')

const devServerConfig = {
  contentBase: path.join(__dirname, '../../build/'),
  historyApiFallback: true, // Need historyApiFallback to be able to refresh on dynamic route
  hot: true,
  compress: true,
  stats: {
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false
  }
}

// always dev enviroment when running webpack dev server. Pass this to webpackConfigFunc when setup
const env = { dev: true }
const server = new WebpackDevServer(
    webpack(webpackConfig(env)),
    devServerConfig
)

server.listen(8080, 'localhost')
