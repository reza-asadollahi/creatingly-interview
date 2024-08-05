
const { Server } = require('socket.io');
const Client = require('socket.io-client');
const { initializeSocket } = require('../socket');

describe('Socket.IO Project Events', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = require('http').createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`, {
        auth: { userId: 'testUser' }
      });
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      initializeSocket(io);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should join a project', (done) => {
    const projectId = 'testProject';
    serverSocket.on('joinProject', ({ projectId }) => {
      expect(projectId).toBe('testProject');
      done();
    });
    clientSocket.emit('joinProject', { projectId });
  });

  test('should leave a project', (done) => {
    const projectId = 'testProject';
    serverSocket.on('leaveProject', ({ projectId }) => {
      expect(projectId).toBe('testProject');
      done();
    });
    clientSocket.emit('leaveProject', { projectId });
  });

  test('should handle mouseMove event', (done) => {
    const projectId = 'testProject';
    const position = { x: 100, y: 200 };
    serverSocket.on('mouseMove', ({ projectId, position }) => {
      expect(projectId).toBe('testProject');
      expect(position).toEqual({ x: 100, y: 200 });
      done();
    });
    clientSocket.emit('mouseMove', { projectId, position });
  });

});
