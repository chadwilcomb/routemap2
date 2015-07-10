// Load required packages
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
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
  modified: {
    type: Date,
    default: Date.now
  },
  modifier: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  layers: [{
    type: Schema.ObjectId,
    ref: 'Layer'
  }]
});
// Export the Mongoose model
module.exports = mongoose.model('Project', ProjectSchema);
