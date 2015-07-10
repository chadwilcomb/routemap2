// Load required packages
var User = require('../models/user');

function cleanse(user) {
  user = user.toObject();
  delete user["password"];
  user.authenticated = true;
  return user;
}

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

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

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

// Create endpoint /api/users/:email for DELETE
exports.deleteUser = function(req, res) {
  // Use the User model to find a specific user and remove it
  User.remove({ email: req.params.email }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed' });
  });
};

// Create endpoint /api/users/:email for PUT
exports.putUser = function(req, res) {

  // Use the Layer model to find a specific layer
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
