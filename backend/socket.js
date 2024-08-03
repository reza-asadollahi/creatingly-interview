const { getProjectById, userJoinsProject, userLeftProject, userMoveMouse } = require('./models/project');

function initializeSocket(io) {
  io.on('connection', (socket) => {
    const userId = socket.handshake.userId;
    console.log('A user connected', socket.id, userId);

    socket.on('joinProject', ({ projectId }) => {
      const project = getProjectById(projectId);
      if (project) {
        const listOfUsersInProject = userJoinsProject(userId, projectId)
        socket.join(projectId);
        socket.to(projectId).emit('projectUsers', listOfUsersInProject);
        console.log(`User ${userId} joined project ${projectId}`);
      }
    });

    socket.on('leaveProject', ({ projectId }) => {
      const project = getProjectById(projectId);
      if (project) {
        const listOfUsersInProject = userLeftProject(projectId, userId)
        socket.leave(projectId);
        socket.to(projectId).emit('projectUsers', listOfUsersInProject);
        console.log(`User ${userId} left project ${projectId}`);
      }
    });

    socket.on('mouseMove', ({ projectId, position }) => {
      const listOfUsersInProject = userMoveMouse(projectId, userId, position)
      socket.to(projectId).emit('projectUsers', listOfUsersInProject);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected', socket.id);
    });
  });
}

module.exports = { initializeSocket };
