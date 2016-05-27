import {createAction} from 'redux-actions'
import {
  ADD,
  DELETE,
  EDIT,
  COMPLETE,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from './constants'

export const addTodo = createAction(ADD)
export const deleteTodo = createAction(DELETE)
export const editTodo = createAction(EDIT, (id, text) => {
  return {
    id, text
  }
})
export const completeTodo = createAction(COMPLETE)
export const completeAll = createAction(COMPLETE_ALL)
export const clearCompleted = createAction(CLEAR_COMPLETED)

const reducer = {

  [ADD]: (state, action) => {
    const text = action.payload

    return Object.assign({}, state, {
      todos: [{
        id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: text
      }].concat(state.todos)
    })
  },

  [DELETE]: (state, action) => {
    const id = action.payload

    return Object.assign({}, state, {
      todos: state.todos.filter(todo =>
        todo.id !== id
      )
    })
  },

  [EDIT]: (state, action) => {
    const {id, text} = action.payload

    return Object.assign({}, state, {
      todos: state.todos.map(todo =>
        todo.id === id ?
          Object.assign({}, todo, { text: text }) :
          todo
      )
    })
  },

  [COMPLETE]: (state, action) => {
    const id = action.payload

    return Object.assign({}, state, {
      todos: state.todos.map(todo =>
        todo.id === id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )
    })
  },

  [COMPLETE_ALL]: (state, action) => {
    const areAllMarked = state.todos.every(todo => todo.completed)
    return Object.assign({}, state, {
      todos: state.todos.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))
    })
  },

  [CLEAR_COMPLETED]: (state, action) => {
    return Object.assign({}, state, {
      todos: state.todos.filter(todo => todo.completed === false)
    })
  }

}

export default {
  reducer
}
