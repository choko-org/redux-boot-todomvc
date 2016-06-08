import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import 'todomvc-app-css/index.css'

import boot from 'redux-boot'
import todo from './modules/todo'
import devel from './modules/sandbox/devel'

const initialState = Object.assign({}, {
  todos: [
    {
      text: 'Use Redux Boot',
      completed: false,
      id: 0
    }
  ]
}, JSON.parse(localStorage.getItem('state')))

const modules = [
  devel,
  todo
]

const app = boot(initialState, modules)

app.then(({action, store}) => {

  // Save state in local storage.
  store.subscribe(() => {
    const state = store.getState()
    localStorage.setItem('state', JSON.stringify(state))
  })

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

})
