const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
  username: {type: String, default: ''},
  phone: {type: String, default: ''},  
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now()}
})

ProfileSchema.methods.summary = function() {
  const summary = {
    username: this.username,
    phone: this.phone,
    email: this.email,
    timestamp: this.timestamp,
    id: this._id.toString()
  }

  return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)