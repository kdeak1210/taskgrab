/** Utility class to manage the initialization, keys etc for the Twilio SDK */
const twilio = require('twilio')

module.exports = {

  sendSMS: (recipient, message, completion) => {
    // Twilio API requires country codes (most people won't think to add it)
    if (recipient.indexOf('+1') == -1){
      recipient = '+1'+recipient
    }

    const client = new twilio(process.env.ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    client.messages.create({
      body: message,
      to: recipient,  // Text this number
      from: '+16314988009' // From a valid Twilio number (same everytime FOR NOW)
    }, (err, message) => {
      if (err){
        completion(err, null)
        return
      }

      completion(null, message)
    })
  }

}