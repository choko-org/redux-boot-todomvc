import {createAction} from 'redux-actions'
import * as types from '../../constants/ActionTypes'

export const addTodo = createAction(types.ADD_TODO)
export const deleteTodo = createAction(types.DELETE_TODO)
export const editTodo = createAction(types.EDIT_TODO)
export const completeTodo = createAction(types.COMPLETE_TODO)
export const completeAll = createAction(types.COMPLETE_ALL)
export const clearCompleted = createAction(types.CLEAR_COMPLETED)

const reducer = {

  [types.ADD_TODO]: (state, action) => {
    return Object.assign({}, state, {
      todos: [{
        id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.text
      }].concat(state.todos)
    })
  },

  [types.DELETE_TODO]: (state, action) => {
    return Object.assign({}, state, {
      todos: state.todos.filter(todo =>
        todo.id !== action.id
      )
    })
  },

  [types.EDIT_TODO]: (state, action) => {
    return Object.assign({}, state, {
      todos: state.todos.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      )
    })
  },

  [types.COMPLETE_TODO]: (state, action) => {
    return Object.assign({}, state, {
      todos: state.todos.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )
    })
  },

  [types.COMPLETE_ALL]: (state, action) => {
    const areAllMarked = state.todos.every(todo => todo.completed)
    return Object.assign({}, state, {
      todos: state.todos.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))
    })
  },

  [types.CLEAR_COMPLETED]: (state, action) => {
    return Object.assign({}, state, {
      todos: state.todos.filter(todo => todo.completed === false)
    })
  }

}

export default {
  reducer
}
