const Message = require('../models/Message')
const Promise = require('bluebird')

// Export a series of functions to deal with Message resources
module.exports = {

  get: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      let filters = {
        sort: {timestamp: -1}
      }

      Message.find(params, null, filters, (err, messages) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(messages)
        } else {
          let list = []
          messages.forEach((message) => {
            list.push(message.summary())
          })

          resolve(list)
        }
      })
    })
  },

  getById: (id, isRaw) => {
    return new Promise((resolve, reject) => {
      Message.findById(id, (err, message) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(message)
        } else {
          resolve(message.summary())
        }
      })
    })
  },

  create: (params, isRaw) => {
    return new Promise((resolve, reject) => {

      Message.create(params, (err, message) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(message)
        } else {
          resolve(message.summary())
        }
      })
    })
  }

}