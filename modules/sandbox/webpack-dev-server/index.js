import path from 'path'
import {HTTP_BOOT} from 'redux-boot-express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

export default {
  middleware: {
    [HTTP_BOOT]: store => next => action => {

      const {httpServer} = action.payload

      const config = require(path.resolve('./webpack.config.js'))
      const compiler = webpack(config)

      httpServer.use(webpackHotMiddleware(compiler))
      httpServer.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
      }))

      return next(action)
    }
  }
}