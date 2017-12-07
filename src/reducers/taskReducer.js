import constants from '../constants'

var initialState = {
  
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.TASKS_RECEIVED:
      console.log('TASKS_RECEIVED: ' + JSON.stringify(action.tasks))
      return updated

    default:
      return updated
  }
}