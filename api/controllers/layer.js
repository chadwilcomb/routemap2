// Load required packages
var Layer = require('../models/layer');

// Create endpoint /api/layers for POSTS
exports.postLayer = function(req, res) {
  // Create a new instance of the Layer model
  var layer = new Layer();

  // Set the layer properties that came from the POST data
  layer.title = req.body.title;
  layer.description = req.body.description;
  layer.features = req.body.features;

  layer.creator = req.user._id;

  // Save the layer and check for errors
  layer.save(function(err) {
    if (err)
      res.send(err);

    res.json(layer);
  });
};

// Create endpoint /api/layers for GET
exports.getLayers = function(req, res) {

  // Use the Layer model to find all layers
  Layer.find({ userId: req.user._id }, function(err, layers) {
    if (err)
      res.send(err);

    res.json(layers);
  });
};

// Create endpoint /api/layers/:layer_id for GET
exports.getLayer = function(req, res) {

  // Use the Layer model to find a specific layer
  Layer.findOne({ userId: req.user._id, _id: req.params.layer_id }, function(err, layer) {
    if (err)
      res.send(err);

    res.json(layer);
  });
};

// Create endpoint /api/layers/:layer_id for PUT
exports.putLayer = function(req, res) {

  // Use the Layer model to find a specific layer
  Layer.findOneAndUpdate(
    { userId: req.user._id, _id: req.params.layer_id },
    {
      brewery: req.body.brewery,
      name: req.body.name,
      type: req.body.type,
      quantity: req.body.quantity,
    },
    { new: true },
    function(err, layer) {
      if (err)
        res.send(err);

    res.json(layer);
  });
};

// Create endpoint /api/layers/:layer_id for DELETE
exports.deleteLayer = function(req, res) {

  // Use the Layer model to find a specific layer and remove it
  Layer.remove({ userId: req.user._id, _id: req.params.layer_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Layer removed' });
  });
};
