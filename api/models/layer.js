// Load required packages
var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var Schema = mongoose.Schema;

var LayerSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: "Title is required",
  },
  description: String,
  features: GeoJSON.FeatureCollection,
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
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Layer', LayerSchema);
