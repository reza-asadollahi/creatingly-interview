const ALL_USERS = [];
const {v4: uuidV4} = require('uuid');

const USER_COLORS = ["purple", "blue", "cyan", "indigo", "orange", "yellow", "red", "pink", "green", "lemon", "brown", "gray"]

function createUser(name, color) {
  const user = {id: uuidV4(), name, color: color || USER_COLORS[ALL_USERS.length % USER_COLORS.length]};
  ALL_USERS.push(user);
  return user;
}

function getAllUsers() {
  return ALL_USERS;
}

function getUserById(id) {
  return ALL_USERS.find(user => user.id === id);
}

function getUserByName(username) {
  return ALL_USERS.find(user => user.name === username);
}


module.exports = {createUser, getUserById, getAllUsers, getUserByName};
