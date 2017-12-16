/** Utility class to manage the initialization, keys etc for the Twilio SDK */
const twilio = require('twilio')
const Promise = require('bluebird')

module.exports = {

  sendSMS: (recipient, message) => {
    return new Promise((resolve, reject) => {

      // Twilio API requires country codes (most people won't think to add it)
      if (recipient.indexOf('+1') == -1){
        recipient = '+1'+recipient
      }

      const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
      const from = process.env.TWILIO_FROM  // Sent from my registered Twilio number

      client.messages.create({
        body: message,
        to: recipient,  // Text this number
        from: from // From a valid Twilio number (same everytime FOR NOW)
      }, (err, response) => {
        if (err){
          reject(err)
          return
        }

        resolve(response)
      })
    })

    
  }

}