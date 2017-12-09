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
  // TWILIO: {"ToCountry":"US","ToState":"NY","SmsMessageSid":"SMbf213928da4985a7908d07f022aff3f2","NumMedia":"0","ToCity":"COLD SPRING HARBOR","FromZip":"11768","SmsSid":"SMbf213928da4985a7908d07f022aff3f2","FromState":"NY","SmsStatus":"received","FromCity":"NORTHPORT","Body":"A sample delivery task","FromCountry":"US","To":"+16314988009","ToZip":"11724","NumSegments":"1","MessageSid":"SMbf213928da4985a7908d07f022aff3f2","AccountSid":"AC8fee9e2287d0cb8a413805dd769185e2","From":"+16318963536","ApiVersion":"2010-04-01"}

  let message = req.body['Body']
  
  let task = {
    title: 'Hardcoded Task',
    category: 'delivery',
    description: message
  }

  let from = req.body['From'] // sender phone number (use to query for profile)
  from = from.replace('+1', '') // Remove the US country code

  controllers.profile.get({phone: from}, false)
  .then((profiles) => {
    if (profiles.length == 0){
      throw new Error('You are not registered with TaskGrab.')
      return
    }

    profile = profiles[0]
    task['profile'] = {       // Add the profile to the task object
      id: profile.id,
      username: profile.username
    }

    return controllers.task.create(task, false) // Returns a promise (continue chain)
  })
  .then((result) => {
    console.log('SUCCESS: ' + JSON.stringify(result))    
    res.send('Hello!')
  })
  .catch((err) => {
    console.log('ERROR: ' + err.message)
  })
})

module.exports = router