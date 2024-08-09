const express = require('express');
const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const { initializeSocket } = require('./socket');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/users', userRoutes);

initializeSocket(io);

module.exports = { server, app, io };
