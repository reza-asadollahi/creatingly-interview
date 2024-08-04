const express = require('express');
const { getProjects, createProject, deleteProject, getProjectById } = require('../controllers/projectController');

const router = express.Router();

router.get('/', getProjects);
router.get('/:projectId', getProjectById);
router.post('/', createProject);
router.delete('/:projectId', deleteProject);

module.exports = router;
