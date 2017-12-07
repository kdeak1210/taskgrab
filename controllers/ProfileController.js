const Profile = require('../models/Profile')
const Promise = require('bluebird')
const bcrypt = require('bcryptjs')

// Export a series of functions to deal with Profile resources
module.exports = {

  get: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      Profile.find(params, (err, profiles) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(profiles)
        } else {
          let list = []
          profiles.forEach((profile) => {
            list.push(profile.summary())
          })

          resolve(list)
        }
      })
    })
  },

  getById: (id, isRaw) => {
    return new Promise((resolve, reject) => {
      Profile.findById(id, (err, profile) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(profile)
        } else {
          resolve(profile.summary())
        }
      })
    })
  },

  create: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      if (params['password']){
        // Hash the password
        params['password'] = bcrypt.hashSync(params['password'], 10)
      }

      Profile.create(params, (err, profile) => {
        if (err){
          reject(err)
          return
        }

        if (isRaw == true){
          resolve(profile)
        } else {
          resolve(profile.summary())
        }
      })
    })
  }

}