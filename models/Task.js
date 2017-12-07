const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  profile: {type: mongoose.SchemaTypes.Mixed, default: {}},
  title: {type: String, default: ''},
  category: {type: String, default:''},
  description: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now()}
})

TaskSchema.methods.summary = function() {
  const summary = {
    profile: this.profile,
    title: this.title,
    category: this.category,
    description: this.description,
    timestamp: this.timestamp,
    id: this._id.toString()
  }

  return summary
}

module.exports = mongoose.model('TaskSchema', TaskSchema)