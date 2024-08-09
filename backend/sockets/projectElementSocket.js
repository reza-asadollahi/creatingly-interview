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
    console.log('addElementToProject', listOfChangedElementInProject)
    io.in(projectId).emit('projectSomeElementChange', listOfChangedElementInProject);
  });

  socket.on('changeElementSequence', ({ projectId, elementId, newSequence }) => {
    const listOfChangedElementInProject = changeElementSequence(projectId, elementId, newSequence);
    console.log('changeElementSequence', listOfChangedElementInProject)
    io.in(projectId).emit('projectSomeElementChange', listOfChangedElementInProject);
  });

  socket.on('updateElement', ({ projectId, elementInfo, changeField }) => {
    const updatedElement = updateElementOfProject(projectId, elementInfo, changeField);
    console.log('updateElement', updatedElement)
    io.to(projectId).emit('projectElementChange', updatedElement);
  });

  socket.on('deleteElementFromProject', ({ projectId, elementId }) => {

    const updatedElement = deleteElementOfProject(projectId, elementId);
    io.to(projectId).emit('deleteElementFromProject', elementId);
    console.log('deleteElementFromProject', updatedElement)
    io.in(projectId).emit('projectSomeElementChange', updatedElement);
  });
}

module.exports = projectElementSocket