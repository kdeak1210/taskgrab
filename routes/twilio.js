const express = require('express')
const router = express.Router()

router.get('/task', (req, res) => {
  res.json({
    confirmation: 'success',
    message: 'it worked'
  })
})

router.post('/task', (req, res) => {
  res.send('hello twilio get task')
})

module.exports = router