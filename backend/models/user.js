const ALL_USERS = [];
const { v4: uuidV4 } = require('uuid');

function createUser(name, color) {
  const user = { id: uuidV4(), name, color };
  ALL_USERS.push(user);
  return user;
}

function getAllUsers() {
  return ALL_USERS;
}

function getUserById(id) {
  return ALL_USERS.find(project => project.id === id);
}


module.exports = { createUser, getUserById, getAllUsers};
