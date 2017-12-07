import constants from '../constants'

var initialState = {
  all: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.TASKS_RECEIVED:
      console.log('TASKS_RECEIVED: ' + JSON.stringify(action.tasks))
      updated['all'] = action.payload

      return updated

    case constants.TASK_CREATED:
      console.log('TASK_CREATED: ' + JSON.stringify(action.task))
      let currentTasks = (updated['all']) ? Object.assign([], updated['all']) : []
      currentTasks.unshift(action.payload)
      updated['all'] = currentTasks

      return updated

    default:
      return updated
  }
}