const Task = require('../models/Task')
const Promise = require('bluebird')

// Export a series of functions to deal with Profile resources
module.exports = {

  get: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      let filters = {
        sort: {timestamp: -1}
      }

      Task.find(params, null, filters, (err, tasks) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(tasks)
        } else {
          let list = []
          tasks.forEach((task) => {
            list.push(task.summary())
          })

          resolve(list)
        }
      })
    })
  },

  getById: (id, isRaw) => {
    return new Promise((resolve, reject) => {
      Task.findById(id, (err, task) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(task)
        } else {
          resolve(task.summary())
        }
      })
    })
  },

  create: (params, isRaw) => {
    return new Promise((resolve, reject) => {

      Task.create(params, (err, task) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(task)
        } else {
          resolve(task.summary())
        }
      })
    })
  }

}