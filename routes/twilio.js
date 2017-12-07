const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/task', (req, res) => {
  res.json({
    confirmation: 'success',
    message: 'it worked'
  })
})

router.post('/task', (req, res) => {
  console.log('TWILIO: ' + JSON.stringify(req.body))

  let message = req.body['Body']
  let task = {
    title: 'Hardcoded Task',
    category: 'delivery',
    description: message
  }

  controllers.task.create(task, false)
  .then((result) => {
    console.log('SUCCESS: ' + JSON.stringify(result))    
    res.send('Hello!')
  })
  .catch((err) => {
    console.log('ERROR: ' + err)
  })

  res.send('hello twilio get task')
})

module.exports = router