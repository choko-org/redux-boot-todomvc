import expect from 'expect'
import {handleActions} from 'redux-actions'
import todoModule from '../../modules/todo'
import {
  ADD,
  DELETE,
  EDIT,
  COMPLETE,
  COMPLETE_ALL,
  CLEAR_COMPLETED
} from '../../modules/todo/constants'

describe('todos reducer', () => {

  // it('should handle initial state', () => {
  //   expect(
  //     todosReducers(undefined, {})
  //   ).toEqual([
  //     {
  //       text: 'Use Redux',
  //       completed: false,
  //       id: 0
  //     }
  //   ])
  // })
  const todosReducers = handleActions(todoModule.reducer)

  it('should handle ADD with empty todos list', () => {

    const initialState = {
      todos: []
    }

    expect(
      todosReducers(initialState, {
        type: ADD,
        payload: 'Run the tests'
      })
    ).toEqual({
      todos: [
        {
          text: 'Run the tests',
          completed: false,
          id: 0
        }
      ]
    })
  })

  it('should handle ADD with an existant list of todos', () => {

    const initialState = {
      todos: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    }

    expect(
      todosReducers(initialState, {
        type: ADD,
        payload: 'Run the tests'
      })
    ).toEqual({
      todos: [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    })

  })

  it('should handle DELETE an item from todo list', () => {

    const initialState = {
      todos: [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    }

    expect(
      todosReducers(initialState, {
        type: DELETE,
        payload: 1
      })
    ).toEqual({
      todos: [
        {
          completed: false,
          text: 'Use Redux',
          id: 0
        }
      ]
    })
  })

  it('should handle EDIT an item from todos list', () => {

    const initialState = {
      todos: [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    }

    expect(
      todosReducers(initialState, {
        type: EDIT,
        payload: {
          text: 'Fix the tests',
          id: 1
        }
      })
    ).toEqual({
      todos: [
        {
          text: 'Fix the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    })
  })

  it('should handle COMPLETE an item from todos list', () => {

    const initialState = {
      todos: [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    }

    expect(
      todosReducers(initialState, {
        type: COMPLETE,
        payload: 1
      })
    ).toEqual({
      todos: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    })
  })

  it('should handle COMPLETE_ALL items from todos list', () => {

    const initialState = {
      todos: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    }

    expect(
      todosReducers(initialState, {
        type: COMPLETE_ALL
      })
    ).toEqual({
      todos: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: true,
          id: 0
        }
      ]
    })

  })

  it('should toggle COMPLETE_ALL items from todos list', () => {
    const initialState = {
      todos: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: true,
          id: 0
        }
      ]
    }

    // Unmark if all todos are currently completed
    expect(
      todosReducers(initialState, {
        type: COMPLETE_ALL
      })
    ).toEqual({
      todos: [
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    })
  })

  it('should handle CLEAR_COMPLETED items from todos list', () => {
    const initialState = {
      todos: [
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    }

    expect(
      todosReducers(initialState, {
        type: CLEAR_COMPLETED
      })
    ).toEqual({
      todos: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ]
    })
  })

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {

    const initialState = {
      todos: [
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }, {
          id: 1,
          completed: false,
          text: 'Write tests'
        }
      ]
    }

    expect(
      [
        {
          type: COMPLETE,
          payload: 0
        }, {
          type: CLEAR_COMPLETED
        }, {
          type: ADD,
          payload: 'Write more tests'
        }
      ].reduce(todosReducers, initialState)
    ).toEqual({
      todos: [
        {
          text: 'Write more tests',
          completed: false,
          id: 2
        }, {
          text: 'Write tests',
          completed: false,
          id: 1
        }
      ]
    })
  })
})
