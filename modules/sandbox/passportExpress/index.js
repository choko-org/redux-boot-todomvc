import express from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import {createAction} from 'redux-actions'

import {HTTP_BOOT} from 'redux-boot-express'

const middleware = {
  
  [HTTP_BOOT]: store => next => action => {

    const nextResult = next(action)

    const state = store.getState()

    const {httpServer} = action.payload

    httpServer.use(cookieParser())

    httpServer.use(bodyParser.urlencoded({ extended: true }))
    httpServer.use(bodyParser.json())

    httpServer.use(expressSession({
      secret: state.secrets.session.secret,
      resave: false,
      saveUninitialized: false
    }))

    httpServer.use(passport.initialize())
    httpServer.use(passport.session())

    store.dispatch(initAction({httpServer, passport}))

    return nextResult
  }

}

export default {
  middleware
}

export const INIT = 'redux-boot/express/passport/INIT'

export const initAction = createAction(INIT)