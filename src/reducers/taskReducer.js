import constants from '../constants'

var initialState = {
  // all: null,
  selectedCategory: 'delivery',
  categories: [
    'delivery',
    'dog walking',
    'house cleaning'
  ]
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.TASKS_RECEIVED:
      //console.log('TASKS_RECEIVED: ' + JSON.stringify(action.tasks))
      const keys = Object.keys(action.params)
      keys.forEach((key, i) => {
        const value = action.params[key] // delivery, dog walking, etc.
        updated[value] = action.payload
      })

      return updated

    case constants.TASK_CREATED:
      //console.log('TASK_CREATED: ' + JSON.stringify(action.payload))
      let currentTasks = (updated['all']) ? Object.assign([], updated['all']) : []
      currentTasks.unshift(action.payload)
      updated['all'] = currentTasks

      return updated

    case constants.CATEGORY_SELECTED:
      //console.log('CATEGORY_SELECTED: ' + JSON.stringify(action.payload))
      updated['selectedCategory'] = action.payload

      return updated

    default:
      return updated
  }
}