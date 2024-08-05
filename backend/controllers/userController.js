const { getAllUsers, createUser, getUserByName, getUserById} = require('../models/user');

exports.getUsers = (req, res) => {
  res.json(getAllUsers());
};

exports.getUserInfo = (req, res) => {
  const user = getUserById(req.params.id)
  if(user)
    res.json(user);
  else
    res.status(404).json({ message: 'User not found' });
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
