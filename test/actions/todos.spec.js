import expect from 'expect'
import {
  ADD,
  DELETE,
  EDIT,
  COMPLETE,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from '../../modules/todo/constants'
import * as actions from '../../modules/todo'

describe('todo actions', () => {
  it('addTodo should create ADD action', () => {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: ADD,
      payload: 'Use Redux'
    })
  })

  it('deleteTodo should create DELETE action', () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: DELETE,
      payload: 1
    })
  })

  it('editTodo should create EDIT action', () => {
    expect(actions.editTodo(1, 'Use Redux everywhere')).toEqual({
      type: EDIT,
      payload: {
        id: 1,
        text: 'Use Redux everywhere'
      }
    })
  })

  it('completeTodo should create COMPLETE action', () => {
    expect(actions.completeTodo(1)).toEqual({
      type: COMPLETE,
      payload: 1
    })
  })

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toEqual({
      type: COMPLETE_ALL,
      payload: undefined
    })
  })

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toEqual({
      type: CLEAR_COMPLETED,
      payload: undefined
    })
  })
})
