const { getAllUsers, createUser } = require('../models/user');

exports.getUsers = (req, res) => {
  res.json(getAllUsers());
};

exports.createUser = (req, res) => {
  const { name, color } = req.body;
  const user = createUser(name, color);
  res.status(201).json(user);
};
