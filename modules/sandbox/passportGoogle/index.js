import {OAuth2Strategy as passportGoogle} from 'passport-google-oauth'
import {createAction} from 'redux-actions'

import {INIT as PASSPORT_INIT} from 'modules/sandbox/passportExpress'

const middleware = {
  
  [PASSPORT_INIT]: store => next => action => {
    const nextResult = next(action)

    const state = store.getState()
    const {passport} = action.payload

    const googleStrategy = new passportGoogle(
      {
        clientID: state.secrets.google.client_id,
        clientSecret: state.secrets.google.client_secret,
        callbackURL: state.passport.callbackUrl
      },
      onSuccess(store)
    )

    passport.use(googleStrategy)

    passport.serializeUser((user, done) => {
      done(null, user)
    })

    passport.deserializeUser((user, done) => {
      done(null, user)
    })
    
    return nextResult
  }

}

export default {
  middleware
}

export const SUCCESS = 'redux-boot/express/passport/google/SUCCESS'
export const successAction = createAction(SUCCESS)

const onSuccess = store => (token, tokenSecret, profile, done) => {
  store.dispatch(successAction({token, tokenSecret, profile}))

  done(null, profile)
}