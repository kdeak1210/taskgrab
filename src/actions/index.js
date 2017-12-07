import constants from '../constants'
import { APIManager } from '../utils'

/** A modular method to run all of the 'gets' through 
 * - should handle all scenarios. Returns the promise to allow it to swing
 * back and continue the chain to wherever calls this method */
const getRequest = (path, params, actionType) => {
  return (dispatch) => // No curly brace wrap here, So can return the PROMISE

    APIManager.get(path, params)
    .then((response) => {
      console.log('GET: ' + JSON.stringify(response))
      const payload = response.results || response.result // backend returns plural sometimes

      dispatch({
        type: actionType,
        payload: payload
      })
    })
    .catch((err) => {
      console.log('ERR: ' + JSON.stringify(err))

    })
  
}


export default {

  fetchTasks: (params) => {
    return (dispatch) => {
      return dispatch(getRequest('/api/task', params, constants.TASKS_RECEIVED))
    }
  },

  tasksReceived: (tasks) => {
    return {
      type: constants.TASKS_RECEIVED,
      tasks: tasks
    }
  },

  taskCreated: (task) => {
    return {
      type: constants.TASK_CREATED,
      task: task
    }
  }

}