import superagent from 'superagent'
import Promise from 'bluebird'

// Series of functions for client-side HTTP requests to a backend
export default {

  get: (url, params) => {
    return new Promise((resolve, reject) => {

      superagent
      .get(url)
      .query(params)
      .set('accept', 'json')
      .end((err, response) => {
        if (err){
          reject(err)
          return
        }

        if (response.body.confirmation != 'success'){
          //reject({ message: response.body.message })
          reject(new Error(response.body.message))
          return
        }

        resolve(response.body)
      })
    })
  },

  post: (url, params) => {
    return new Promise((resolve, reject) => {

      superagent
      .post(url)
      .send(params)
      .set('accept', 'json')
      .end((err, response) => {
        if (err){
          reject(err)
          return
        }

        if (response.body.confirmation != 'success'){
          //reject({ message: response.body.message })
          reject(new Error(response.body.message))
          return
        }

        resolve(response.body)
      })
    })
  }

}