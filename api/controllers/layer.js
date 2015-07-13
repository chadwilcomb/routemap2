// Load required packages
var Layer = require('../models/layer');

/**
* @apiDefine LayerSuccess
*
* @apiSuccess {String} _id Layer ID.
* @apiSuccess {String} title Layer Title.
* @apiSuccess {String} description Layer Description.
* @apiSuccess {Object} features GeoJSON Feature Collection.
* @apiSuccess {Object} creator User that created the Layer.
* @apiSuccess {Date} created Timestamp when the Layer was created.
* @apiSuccess {Object} modifier User that last modified the Layer.
* @apiSuccess {Date} modified Timestamp when the Layer was last modified.
*
*/

/**
* @apiDefine LayerSuccessExample
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "_id": "55a03ba3811e0b030098f036",
*       "title": "aiport_polygons",
*       "description": "Polygons boundaries of Airports",
*       "features": "{type: "FeatureCollection", features: "[{...},{...}]"}",
*       "creator": {_id: "55a038daaeec1a0300b0e42d", email: "user@placeiq.com", firstName: "Plaise", lastName: "Iqueue"}
*       "created": "2015-07-10T21:36:08.797Z",
*       "creator": {_id: "55a038daaeec1a0300b0e42d", email: "anotherguy@placeiq.com", firstName: "Guy", lastName: "Hoochang"}
*       "modified": "2015-07-15T14:22:25.444Z",
*     }
*
*/

/**
 * @api {post} /api/layers Create New Layer
 * @apiName PostLayer
 * @apiGroup Layer
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam {String} title Layer Title.
 * @apiParam {String} description Layer Description.
 * @apiParam {Object} features GeoJSON FeatureCollection.
 *
 * @apiUse LayerSuccess
 * @apiUse LayerSuccessExample
 *
 */

// Create endpoint /api/layers for POSTS
exports.postLayer = function(req, res) {
  // Create a new instance of the Layer model
  var layer = new Layer();

  // Set the layer properties that came from the POST data
  layer.title = req.body.title;
  layer.description = req.body.description;
  layer.features = req.body.features;
  layer.creator = layer.modifier = req.user._id;

  // Save the layer and check for errors
  layer.save(function(err) {
    if (err)
      res.send(err);

    res.json(layer);
  });
};

/**
 * @api {get} /api/layers Get All Layers
 * @apiName CreateLayer
 * @apiGroup Layer
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiUse LayerSuccess
 * @apiUse LayerSuccessExample
 *
 */
// Create endpoint /api/layers for GET
exports.getLayers = function(req, res) {

  // Use the Layer model to find all layers
  Layer.find()
    .select('-features')
    .populate({
      path: 'creator',
      select: 'email firstName lastName'
    })
    .populate({
      path: 'modifier',
      select: 'email firstName lastName'
    })
    .exec(function (err, layers) {
      if (err)
        res.send(err);

      res.json(layers);
    });

};

/**
 * @api {get} /api/layers/:layer_id Get Layer By Id
 * @apiName GetLayer
 * @apiGroup Layer
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} layer_id Layer ID.
 *
 * @apiUse LayerSuccess
 * @apiUse LayerSuccessExample
 *
 */
// Create endpoint /api/layers/:layer_id for GET
exports.getLayer = function(req, res) {

  // Use the Layer model to find a specific layer
  Layer.findOne({ _id: req.params.layer_id })
    .populate({
      path: 'creator',
      select: 'email firstName lastName'
    })
    .populate({
      path: 'modifier',
      select: 'email firstName lastName'
    })
    .exec(function (err, layer) {
      if (err)
        res.send(err);

      res.json(layer);
    });
};

/**
 * @api {put} /api/layers/:layer_id Update Layer
 * @apiName UpdateLayer
 * @apiGroup Layer
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} layer_id Layer ID.
 *
 * @apiParam {String} title Layer Title.
 * @apiParam {String} description Layer Description.
 * @apiParam {Object} features GeoJSON FeatureCollection.
 *
 * @apiUse LayerSuccess
 * @apiUse LayerSuccessExample
 *
 */
// Create endpoint /api/layers/:layer_id for PUT
exports.putLayer = function(req, res) {

  // Use the Layer model to find a specific layer
  Layer.findOneAndUpdate(
    { _id: req.params.layer_id },
    {
      title: req.body.title,
      description: req.body.description,
      features: req.body.features,
      modifier: req.user._id,
      modified: Date.now()
    },
    { new: true },
    function(err, layer) {
      if (err)
        res.send(err);

    res.json(layer);
  });
};

/**
 * @api {delete} /api/layers/:layer_id Delete Layer
 * @apiName DeleteLayer
 * @apiGroup Layer
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} layer_id Layer ID.
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Layer removed"
 *     }
 */
// Create endpoint /api/layers/:layer_id for DELETE
exports.deleteLayer = function(req, res) {

  // Use the Layer model to find a specific layer and remove it
  Layer.remove({ _id: req.params.layer_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Layer removed' });
  });
};
