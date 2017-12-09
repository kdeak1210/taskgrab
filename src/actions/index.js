import constants from '../constants'
import { APIManager } from '../utils'

/** A modular method to run all of the 'gets' through 
 * - should handle all scenarios. Returns the promise to allow it to swing
 * back and continue the chain to wherever calls this method */
const getRequest = (path, params, actionType) => {
  return (dispatch) => // No curly brace wrap here, So can return the PROMISE

    APIManager.get(path, params)
    .then((response) => {
      //console.log('GET: ' + JSON.stringify(response))
      const payload = response.results || response.result || response.user

      dispatch({
        type: actionType,
        payload: payload,
        params: params        
      })
    })
    .catch((err) => {
      throw err // propagate the error down the chain
    })
}

const postRequest = (path, params, actionType) => {
  return (dispatch) => 
    
    APIManager.post(path, params)
    .then((response) => {
      //console.log('POST: ' + JSON.stringify(response))
      const payload = response.results || response.result || response.user
      
      dispatch({
        type: actionType,
        payload: payload,
        params: params
      })
    })
    .catch((err) => {
      throw err // propagate the error down the chain
    })
}


export default {

  register: (credentials) => {
    return (dispatch) => {
      return dispatch(postRequest('/account/register', credentials, constants.PROFILE_CREATED))
    }
  },

  login: (credentials) => {
    return (dispatch) => {
      return dispatch(postRequest('/account/login', credentials, constants.USER_LOGGED_IN))
    }
  },

  checkCurrentUser: () => {
    return (dispatch) => {
      return dispatch(getRequest('/account/currentuser', null, constants.USER_LOGGED_IN))
    }
  },

  fetchTasks: (params) => {
    return (dispatch) => {
      return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED))
    }
  },

  tasksReceived: (tasks) => {
    return {
      type: constants.TASKS_RECEIVED,
      payload: tasks
    }
  },

  selectCategory: (category) => {
    return {
      type: constants.CATEGORY_SELECTED,
      payload: category
    }
  },

  // taskCreated: (task) => {
  //   return {
  //     type: constants.TASK_CREATED,
  //     payload: task
  //   }
  // }

  submitTask: (params) => {
    return (dispatch) => {
      return dispatch(postRequest('/api/task', params, constants.TASK_CREATED))
    }
  }

}