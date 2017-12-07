const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
  profile: {type: mongoose.SchemaTypes.Mixed, default: {}},
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now()}
})

TaskSchema.methods.summary = () => {
  const summary = {
    profile: this.profile,
    title: this.title,
    description: this.description,
    timestamp: this.timestamp,
    id: this._id.toString()
  }

  return summary
}

module.exports = mongoose.model('TaskSchema', TaskSchema)