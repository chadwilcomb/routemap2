// Load required packages
var User = require('../models/user');

/**
* @apiDefine UserSuccess
*
* @apiSuccess {String} _id User ID.
* @apiSuccess {String} email User email (unique constraint).
* @apiSuccess {String} firstName User first name.
* @apiSuccess {String} lastName User last name.
* @apiSuccess {string="admin","user"} type User type.
* @apiSuccess {Date} joined Timestamp when the User was created.
* @apiSuccess {Date} lastLogin Timestamp when the User was last authenticated.
*
*/

/**
* @apiDefine UserSuccessExample
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "_id": "55a03ba3811e0b030098f036",
*       "email": "user@placeiq.com",
*       "firstName": "Plaise",
*       "lastName": "Iqueue",
*       "type": "admin",
*       "joined": "2015-07-10T21:36:08.797Z",
*       "lastLogin": "2015-07-15T14:22:25.444Z",
*     }
*
*/

function cleanse(user) {
  user = user.toObject();
  delete user["password"];
  user.authenticated = true;
  return user;
}


/**
 * @api {post} /api/users Create New User
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam {String} email Email address (unique constraint).
 * @apiParam {String} password Password.
 * @apiParam {String} firstName First name of User.
 * @apiParam {String} lastName Last name of User.
 *
 * @apiUse UserSuccess
 * @apiUse UserSuccessExample
 *
 */
// Create endpoint /api/users for POST
exports.postUser = function(req, res) {
  console.log(req.body);

  var user = new User({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  user.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json(cleanse(user));
  });
};

/**
 * @api {get} /api/users Get All Users
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiUse UserSuccess
 * @apiUse UserSuccessExample
 *
 */
// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};


/**
 * @api {get} /api/users/:email Get User By Email
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} email User's Email address.
 *
 * @apiUse UserSuccess
 * @apiUse UserSuccessExample
 *
 */
// Create endpoint /api/users/:email for GET
exports.getUser = function(req, res) {
  // Use the User model to find a specific user
  User.findOne({ email: req.params.email }, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
    // res.json(cleanse(user));
  });
};


/**
 * @api {delete} /api/users/:email Delete User By Email
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} email User email address.
 *
 * @apiSuccess {String} message Success Message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User removed"
 *     }
 *
 */
// Create endpoint /api/users/:email for DELETE
exports.deleteUser = function(req, res) {
  // Use the User model to find a specific user and remove it
  User.remove({ email: req.params.email }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed' });
  });
};


/**
 * @api {put} /api/users/:user_id Update User
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Basic + encoded username:password.
 *
 * @apiParam (URL) {String} email User email address.
 *
 * @apiParam {String} email Email address (unique constraint).
 * @apiParam {String} password Password.
 * @apiParam {String} firstName First name of User.
 * @apiParam {String} lastName Last name of User.
 * @apiParam {string="admin","user"} type User type.
 *
 * @apiUse UserSuccess
 * @apiUse UserSuccessExample
 *
 */
// Create endpoint /api/users/:email for PUT
exports.putUser = function(req, res) {

  // Use the User model to find a specific user
  User.findOneAndUpdate(
    { email: req.params.email },
    {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type
    },
    { new: true },
    function(err, user) {
      if (err)
        res.send(err);

    res.json(user);
  });
};
