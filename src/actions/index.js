import constants from '../constants'

export default {

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