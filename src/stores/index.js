import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { accountReducer, messageReducer, profileReducer, taskReducer } from '../reducers'

var store

export default {

  configureStore: () => {

    const reducers = combineReducers({
      account: accountReducer,
      message: messageReducer,
      profile: profileReducer,
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