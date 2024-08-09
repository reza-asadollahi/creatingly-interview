const {getProjectById, userJoinsProject, userLeftProject, userMoveMouse, userDisconnect} = require("../models/project");
const {getUserById} = require("../models/user");
const {getAllElementOfProject} = require("../models/projectElements");

function projectElementSocket(io, socket, userId) {

  socket.on('joinProject', ({ projectId }) => {
    const project = getProjectById(projectId);
    if (project) {
      const listOfUsersInProject = userJoinsProject(userId, projectId)
      socket.join(projectId);
      socket.in(projectId).emit('projectUsersActivity', listOfUsersInProject);

      // send project data to new joined user
      const listOfAllElementInProject = getAllElementOfProject(projectId);
      socket.emit('projectListElementChanges', listOfAllElementInProject);

      console.log(`User ${userId} joined project ${projectId}`);
    }
  });

  socket.on('leaveProject', ({ projectId }) => {
    const project = getProjectById(projectId);
    if (project) {
      const listOfUsersInProject = userLeftProject(projectId, userId)
      socket.leave(projectId);
      socket.to(projectId).emit('projectUsersActivity', listOfUsersInProject);
      console.log(`User ${userId} left project ${projectId}`);
    }
  });

  socket.on('mouseMove', ({ projectId, position }) => {
    if(getUserById(userId)) {
      const listOfUsersInProject = userMoveMouse(projectId, userId, position)
      socket.to(projectId).emit('projectUsersActivity', listOfUsersInProject);
    }
  });


  socket.on('disconnect', () => {
    userDisconnect(userId)
    console.log('A user disconnected', socket.id);
  });
}

module.exports = projectElementSocket