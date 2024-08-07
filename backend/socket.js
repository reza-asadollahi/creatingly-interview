const { getProjectById, userJoinsProject, userLeftProject, userMoveMouse } = require('./models/project');
const { getUserById } = require("./models/user");
const projectElementSocket = require("./sockets/projectElementSocket");
const projectSocket = require("./sockets/projectSocket");


function initializeSocket(io) {
  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    console.log('A user connected', socket.id, userId);

    projectElementSocket(io, socket)

    projectSocket(io, socket, userId)
  });
}

module.exports = { initializeSocket };
