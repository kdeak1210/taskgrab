const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  profile: {type: mongoose.SchemaTypes.Mixed, default: {}},
  task: {type: String, default: ''},
  content: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now}
})

MessageSchema.methods.summary = function(){
  const summary = {
    profile: this.profile,
    task: this.task,
    content: this.content,
    timestamp: this.timestamp,
    id: this._id.toString()
  }

  return summary
}

module.exports = mongoose.model('MessageSchema', MessageSchema)