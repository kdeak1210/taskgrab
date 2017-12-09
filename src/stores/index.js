import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { accountReducer, taskReducer } from '../reducers'

var store

export default {

  configureStore: () => {

    const reducers = combineReducers({
      account: accountReducer, 
      task: taskReducer
    })

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }

}