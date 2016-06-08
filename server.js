import path from 'path'
import boot from 'redux-boot'
import expressModule from 'redux-boot-express'
import serverModule from './modules/server'

const initialState = {}

let modules = [
  expressModule,
  serverModule
]

if (process.env.NODE_ENV !== 'production') {
  const webpackDevModule = require('./modules/sandbox/webpack-dev-server').default
  modules.push(webpackDevModule)
}

const app = boot(initialState, modules)