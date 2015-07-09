// Load required packages
var mongoose = require('mongoose')
    Schema = mongoose.Schema;
var GeoJSON = require('mongoose-geojson-schema');

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
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Layer', LayerSchema);
