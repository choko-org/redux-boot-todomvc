import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import 'todomvc-app-css/index.css'

import boot from 'redux-boot'
import todo from './modules/todo'
import devel from './modules/sandbox/devel'

const url = window.location.href.toString().split(window.location.host)[1]
const stateKey = 'state' + url

const initialState = Object.assign({}, {
  title: url.split('/').pop(),
  todos: [
    {
      text: 'Use Redux Boot',
      completed: false,
      id: 0
    }
  ]
}, JSON.parse(localStorage.getItem(stateKey)))

const modules = [
  devel,
  todo
]

const app = boot(initialState, modules)

app.then(({action, store}) => {

  // Save state in local storage.
  store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem(stateKey, JSON.stringify(state))
  })

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

})
