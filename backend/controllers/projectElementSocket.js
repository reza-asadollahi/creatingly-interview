const {
  addElementToProject,
  getElementProjectById,
  getAllElementOfProject,
  deleteElementOfProject,
  updateElementOfProject,
  changeElementSequence,
} = require('../models/projectElements');

function projectElementSocket(io, socket) {

  socket.on('getAllElementList', ({ projectId }) => {
    const listOfAllElementInProject = getAllElementOfProject(projectId);
    socket.emit('projectListElementChanges', listOfAllElementInProject);
  });

  socket.on('addElementToProject', ({ projectId, elementInfo, index }) => {
    const element = addElementToProject(projectId, elementInfo, index);
    const listOfAllElementInProject = getAllElementOfProject(projectId)
    io.to(projectId).emit('projectListElementChanges', listOfAllElementInProject);
    // io.to(projectId).emit('projectElementChanges', element);
  });

  socket.on('changeElementSequence', ({ projectId, elementId, newSequence }) => {
    const listOfAllElementInProject = changeElementSequence(projectId, elementId, newSequence);
    io.to(projectId).emit('projectListElementChanges', listOfAllElementInProject);
  });

  socket.on('updateElement', ({ projectId, elementInfo }) => {
    const listOfAllElementInProject = updateElementOfProject(projectId, elementInfo);
    io.to(projectId).emit('projectListElementChanges', listOfAllElementInProject);
  });
}

module.exports = projectElementSocket