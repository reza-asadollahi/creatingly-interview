const {v4: uuidV4} = require('uuid');
const {getUserById} = require('./user')

const ALL_PROJECTS = []
/** map project id to list of users info and mouse position */
const PROJECT_USERS = new Map()

function createProject(name, owner, styles = {}) {
  const project = {id: uuidV4(), name, owner, styles};
  ALL_PROJECTS.push(project);
  return project;
}

function getProjectById(id) {
  return ALL_PROJECTS.find(project => project.id === id);
}

function getAllProject() {
  return ALL_PROJECTS
}

function deleteProject(id) {
  const index = ALL_PROJECTS.findIndex(project => project.id === id);
  if (index !== -1) ALL_PROJECTS.splice(index, 1);
}


function userJoinsProject(projectId, userId) {
  if (!PROJECT_USERS.get(projectId))
    PROJECT_USERS.set(projectId, [])

  const listOfUsersInProject = PROJECT_USERS.get(projectId)


  if (!listOfUsersInProject.find(item => item.id === userId))
    listOfUsersInProject.push({
      id: userId,
      userInfo: getUserById(userId),
      mousePosition: undefined // [x, y]
    })

  return listOfUsersInProject
}

function userLeftProject(projectId, userId) {
  if (!PROJECT_USERS.get(projectId))
    PROJECT_USERS.set(projectId, [])

  const listOfUsersInProject = PROJECT_USERS.get(projectId)
  const userInfoIndex = listOfUsersInProject.findIndex(item => item.id === userId)
  if (userInfoIndex !== -1)
    listOfUsersInProject.splice(userInfoIndex, 1)

  return listOfUsersInProject
}

function userDisconnect(userId) {
  for (let projectId of PROJECT_USERS.keys()) {
    if (PROJECT_USERS.get(projectId)) {
      const listOfUsersInProject = PROJECT_USERS.get(projectId)
      const userInfoIndex = listOfUsersInProject.findIndex(item => item.id === userId)
      if (userInfoIndex !== -1)
        listOfUsersInProject.splice(userInfoIndex, 1)
    }
  }
}

function userMoveMouse(projectId, userId, mousePosition) {
  if (!PROJECT_USERS.get(projectId))
    PROJECT_USERS.set(projectId, [])

  const listOfUsersInProject = PROJECT_USERS.get(projectId)
  const userInfo = listOfUsersInProject.find(item => item.id === userId)
  if (!userInfo)
    listOfUsersInProject.push({
      id: userId,
      userInfo: getUserById(userId),
      mousePosition
    })
  else
    userInfo.mousePosition = mousePosition

  return listOfUsersInProject
}

module.exports = {
  getAllProject,
  createProject,
  deleteProject,
  getProjectById,
  userJoinsProject,
  userLeftProject,
  userDisconnect,
  userMoveMouse
}