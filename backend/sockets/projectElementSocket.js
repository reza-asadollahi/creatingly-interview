const {
  addElementToProject,
  getElementProjectById,
  getAllElementOfProject,
  deleteElementOfProject,
  updateElementOfProject,
  changeElementSequence,
} = require('../models/projectElements');

function projectElementSocket(io, socket) {

  socket.on('addElementToProject', ({ projectId, elementInfo, index }) => {
    const listOfChangedElementInProject = addElementToProject(projectId, elementInfo, index);
    io.in(projectId).emit('projectSomeElementChange', listOfChangedElementInProject);
  });

  socket.on('changeElementSequence', ({ projectId, elementId, newSequence }) => {
    const listOfChangedElementInProject = changeElementSequence(projectId, elementId, newSequence);
    io.in(projectId).emit('projectSomeElementChange', listOfChangedElementInProject);
  });

  socket.on('updateElement', ({ projectId, elementInfo, changeField }) => {
    const updatedElement = updateElementOfProject(projectId, elementInfo, changeField);
    io.to(projectId).emit('projectElementChange', updatedElement);
  });

  socket.on('deleteElementFromProject', ({ projectId, elementId }) => {

    const updatedElement = deleteElementOfProject(projectId, elementId);
    io.to(projectId).emit('deleteElementFromProject', elementId);
    io.in(projectId).emit('projectSomeElementChange', updatedElement);
  });
}

module.exports = projectElementSocket