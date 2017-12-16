const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const TwilioManager = require('../utils/TwilioManager')

router.get('/task', (req, res) => {
  res.json({
    confirmation: 'success',
    message: 'it worked'
  })
})

router.get('/notify', (req, res) => {

  // Use our manager to send a message from the Twilio # to a recipient
  TwilioManager.sendSMS('6318963536', 'Testing Heroku refactor')
  .then(message => {
    res.json({
      confirmation: 'success',
      message: message
    })
  })
  .catch(err => {
    res.json({
      confirmation: 'fail',
      message: err
    })
  })

})

router.post('/task', (req, res) => {
  console.log('TWILIO: ' + JSON.stringify(req.body))
  // TWILIO: {"ToCountry":"US","ToState":"NY","SmsMessageSid":"SMbf213928da4985a7908d07f022aff3f2","NumMedia":"0","ToCity":"COLD SPRING HARBOR","FromZip":"11768","SmsSid":"SMbf213928da4985a7908d07f022aff3f2","FromState":"NY","SmsStatus":"received","FromCity":"NORTHPORT","Body":"A sample delivery task","FromCountry":"US","To":"+16314988009","ToZip":"11724","NumSegments":"1","MessageSid":"SMbf213928da4985a7908d07f022aff3f2","AccountSid":"AC8fee9e2287d0cb8a413805dd769185e2","From":"+16318963536","ApiVersion":"2010-04-01"}

  let message = req.body['Body']

  // Title. Category. task description.
  // example: 'Package Pickup. Delivery. Please pick up my package.'
  let parts = message.split('.')  // should be 3 parts
  let title = parts[0];
  let category = (parts.length == 1) ? 'miscellaneous' : parts[1].trim().toLowerCase();
  let description = (parts.length < 3) ? '' : parts[2].trim();

  let task = {
    title: title,
    category: category,
    description: description
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