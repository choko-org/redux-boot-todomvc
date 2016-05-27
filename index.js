import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import 'todomvc-app-css/index.css'

import boot from 'redux-boot'
import todo from './modules/todo'

const initialState = {
  todos: [
    {
      text: 'Use Redux Boot',
      completed: false,
      id: 0
    }
  ]
}

const modules = [
  todo
]

const app = boot(initialState, modules)

app.then(({action, store}) => {

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

})
