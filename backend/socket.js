const { getProjectById, userJoinsProject, userLeftProject, userMoveMouse } = require('./models/project');
const { getUserById } = require("./models/user");

function initializeSocket(io) {
  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    console.log('A user connected', socket.id, userId);

    socket.on('joinProject', ({ projectId }) => {
      const project = getProjectById(projectId);
      if (project) {
        const listOfUsersInProject = userJoinsProject(userId, projectId)
        socket.join(projectId);
        socket.to(projectId).emit('projectUsersActivity', listOfUsersInProject);
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
      console.log('A user disconnected', socket.id);
    });
  });
}

module.exports = { initializeSocket };
