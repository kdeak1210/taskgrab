import constants from '../constants'

var initialState = {
  // all: null,
  selectedCategory: 'delivery',
  categories: [
    'delivery',
    'dog walking',
    'house cleaning',
    'misc'
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
        updated[value] = action.payload // ex. updated['delivery'] = [Array of tasks in category]
      })

      action.payload.forEach((task, i) => {
        updated[task.id] = task // ALSO stores the tasks by their id as a key
      })

      return updated

    case constants.TASK_CREATED:
      //console.log('TASK_CREATED: ' + JSON.stringify(action.payload))
      let currentTasks = (updated[action.payload.category]) ? Object.assign([], updated[action.payload.category]) : []
      currentTasks.unshift(action.payload)
      updated[action.payload.category] = currentTasks

      return updated

    case constants.CATEGORY_SELECTED:
      //console.log('CATEGORY_SELECTED: ' + JSON.stringify(action.payload))
      updated['selectedCategory'] = action.payload

      return updated

    default:
      return updated
  }
}