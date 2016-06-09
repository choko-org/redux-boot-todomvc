import path from 'path'
import {HTTP_BOOT, HTTP_AFTER_BOOT, HTTP_REQUEST} from 'redux-boot-express'
import express from 'express'

export default {
  reducer: {
    [HTTP_AFTER_BOOT]: (state, action) => {
      const port = state.variables.port
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
      return state
    }    
  },
  middleware: {
    [HTTP_BOOT]: store => next => action => {

      const {httpServer} = action.payload

      httpServer.get('/', (req, res) => {

        res.redirect('/todo/master')
      })

      httpServer.get('/todo/:name', (req, res) => {

        res.sendFile(path.resolve(__dirname + '/index.html'))
      })

      if (process.env.NODE_ENV === 'production') {
        httpServer.use('/static', express.static('dist'));
      }

      return next(action)
    }
  }
}