const {v4: uuidV4} = require('uuid');

/** map project id to list of Elements and it's configuration */
const PROJECT_ELEMENTS = new Map()

function addElementToProject(projectId, elementInfo, index) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  let updatedProjectElements = []
  const newElement = {id: uuidV4(), ...elementInfo, sequence: elementInfo?.sequence ?? projectElements?.length ?? 1};
  if (!projectElements) {
    updatedProjectElements = projectElements = [newElement]
    PROJECT_ELEMENTS.set(projectId, projectElements)
  } else if (!isNaN(index) || index !== undefined) {
    projectElements.splice(index, 0, newElement)
    updatedProjectElements = projectElements.slice(index - 1).map((pel, i) => {
      pel.sequence = index + i + 1
      return pel
    })
  } else {
    projectElements.push(newElement)
    updatedProjectElements = projectElements
  }
  return updatedProjectElements;
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
  const index = projectElements.findIndex(el => el.id === id);
  let updatedProjectElements = []
  if (index !== -1) {
    projectElements.splice(index, 1)
    updatedProjectElements = projectElements.slice(index).map((pel, i) => {
      pel.sequence = index + i + 1
      return pel
    })
  }
  return updatedProjectElements
}

function updateElementOfProject(projectId, elementInfo, changeField) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  const index = projectElements?.findIndex(el => el.id === elementInfo.id);
  if (index !== undefined || index !== -1) {
    if (changeField === 'generalConfig') {
      projectElements[index] = {
        ...projectElements[index],
        generalConfig: {
          ...projectElements[index].generalConfig || {},
          ...elementInfo?.generalConfig || {}
        }
      }
    } else if (changeField === 'extraConfig') {
      projectElements[index] = {
        ...projectElements[index],
        extraConfig: {
          ...projectElements[index].extraConfig || {},
          ...elementInfo?.extraConfig || {}
        }
      }
    } else if (changeField === 'content') {
      projectElements[index] = {
        ...projectElements[index],
        content: elementInfo?.content
      }
    } else {
      projectElements[index] = {...projectElements[index], ...elementInfo}
    }
  }
  return projectElements[index]
}

function changeElementSequence(projectId, id, newSequence) {
  let projectElements = PROJECT_ELEMENTS.get(projectId)
  const updatedProjectElements = []
  const index = projectElements.findIndex(el => el.id === id);
  if (index !== -1) {
    const [movedElement] = projectElements.splice(index, 1);
    projectElements.splice(newSequence, 0, movedElement);
    // projectElements.splice(newSequence, 0, projectElements.splice(index, 1)[0])
    projectElements.forEach((el, i) => {
      if (el.sequence !== i + 1) {
        el.sequence = i + 1
        updatedProjectElements.push(el)
      }
    })
  }
  return updatedProjectElements
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