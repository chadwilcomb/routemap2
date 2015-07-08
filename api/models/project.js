// Load required packages
var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
    required: "Title is required",
  },
  description: String,
  state: {
    type: String,
    enum: ['staged', 'live'],
    lowercase: true,
    default: 'staged'
  },
  created: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  account: {
    type: Schema.ObjectId,
    ref: 'Account'
  }
  features: [{
    type: Schema.ObjectId,
    ref: 'Feature'
  }]
});
// Export the Mongoose model
module.exports = mongoose.model('Project', ProjectSchema);
