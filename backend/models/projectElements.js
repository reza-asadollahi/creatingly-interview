const { v4: uuidV4 } = require('uuid');

/** map project id to list of Elements and it's configuration */
const PROJECT_ELEMENTS = new Map()

function addElementToProject(projectId, elementInfo, index) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  const element = { id: uuidV4(), ...elementInfo, sequence: projectElements?.length || 1 };
  if(!projectElements) {
    projectElements = [element]
    PROJECT_ELEMENTS.set(projectId, projectElements)
  } else if(!isNaN(index) || index !== undefined) {
    projectElements.splice(index, 0, element)
    projectElements.forEach((pel, i) => (pel.sequence = i+1))
  } else {
    projectElements.push(element)
  }
  return element;
}

function getElementProjectById(projectId, id) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  return projectElements.find(el => el.id === id);
}

function getAllElementOfProject(projectId) {
  return PROJECT_ELEMENTS.get(projectId) || []
}

function deleteElementOfProject(projectId, id) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  const index =  projectElements.findIndex(el => el.id === id);
  if (index !== -1) projectElements.splice(index, 1);
}

function updateElementOfProject(projectId, elementInfo) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  const index =  projectElements?.findIndex(el => el.id === elementInfo.id);
  if (index !== undefined || index !== -1) projectElements[index] = {...projectElements[index], ...elementInfo}
  return projectElements
}

function changeElementSequence(projectId, id, newSequence) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  const index =  projectElements.findIndex(el => el.id === id);
  if (index !== -1) {
    const [movedElement] = projectElements.splice(index, 1);
    projectElements.splice(newSequence, 0, movedElement);
    // projectElements.splice(newSequence, 0, projectElements.splice(index, 1)[0])
    projectElements.forEach((pel, i) => (pel.sequence = i+1))
  }
  return projectElements
}

module.exports = {
  addElementToProject,
  getElementProjectById,
  getAllElementOfProject,
  deleteElementOfProject,
  updateElementOfProject,
  changeElementSequence
}

/** ElementInfo model */
//  ElementInfo {
//   id?: string,
//   elementType: ElementType,
//   generalConfig?: {
//     width?: string,
//     height?: string,
//     position?: 'absolute' | 'relative',
//     zIndex?: number,
//     top?: number
//     left?: number
//     right?: number
//     button?: number
//     color?: string
//     backgroundColor?: string
//     cssClasses?: string
//   }
//   content?: string
//   sequence?: number
//   lockedByUser?: string
//   extraConfig?: any
// }