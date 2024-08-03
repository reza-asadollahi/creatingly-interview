const { getAllUsers, createUser, getUserByName, getUserById} = require('../models/user');

exports.getUsers = (req, res) => {
  res.json(getAllUsers());
};

exports.getUserInfo = (req, res) => {
  res.json(getUserById(req.params.id));
};

exports.loginOrSignupUser = (req, res) => {
  let user = getUserByName(req.body.name)
  if(!user){
    user = createUser(req.body.name, req.body.color)
  }
  res.json(user);
};

exports.createUser = (req, res) => {
  const { name, color } = req.body;
  const user = createUser(name, color);
  res.status(201).json(user);
};
