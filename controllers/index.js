const MessageController = require('./MessageController')
const ProfileController = require('./ProfileController')
const TaskController = require('./TaskController')

module.exports = {

  message: MessageController,
  profile: ProfileController,
  task: TaskController

}