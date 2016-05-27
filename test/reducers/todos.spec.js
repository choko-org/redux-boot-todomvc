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

  it('should handle ADD with empty inital state', () => {

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

  it('should handle ADD with an existant collection in state', () => {

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
        text: 'Run the tests'
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

    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: ADD,
        text: 'Fix the tests'
      })
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: 2
      }, {
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle DELETE', () => {
    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: DELETE,
        id: 1
      })
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle EDIT', () => {
    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: EDIT,
        text: 'Fix the tests',
        id: 1
      })
    ).toEqual([
      {
        text: 'Fix the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle COMPLETE', () => {
    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: false,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: COMPLETE,
        id: 1
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle COMPLETE_ALL', () => {
    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: COMPLETE_ALL
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: true,
        id: 1
      }, {
        text: 'Use Redux',
        completed: true,
        id: 0
      }
    ])

    // Unmark if all todos are currently completed
    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: true,
          id: 0
        }
      ], {
        type: COMPLETE_ALL
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 1
      }, {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should handle CLEAR_COMPLETED', () => {
    expect(
      todosReducers([
        {
          text: 'Run the tests',
          completed: true,
          id: 1
        }, {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ], {
        type: CLEAR_COMPLETED
      })
    ).toEqual([
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }
    ])
  })

  it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
    expect(
      [
        {
          type: COMPLETE,
          id: 0
        }, {
          type: CLEAR_COMPLETED
        }, {
          type: ADD,
          text: 'Write more tests'
        }
      ].reduce(todos, [
        {
          id: 0,
          completed: false,
          text: 'Use Redux'
        }, {
          id: 1,
          completed: false,
          text: 'Write tests'
        }
      ])
    ).toEqual([
      {
        text: 'Write more tests',
        completed: false,
        id: 2
      }, {
        text: 'Write tests',
        completed: false,
        id: 1
      }
    ])
  })
})
