const { getAllProject, getProjectById, createProject, deleteProject } = require('../models/project');

exports.getProjects = (req, res) => {
  res.json(getAllProject());
};

exports.createProject = (req, res) => {
  const { name } = req.body;
  const { userId } = req.user;
  const project = createProject(name, userId);
  res.status(201).json(project);
};

exports.deleteProject = (req, res) => {
  const { projectId } = req.params;
  const { userId } = req.user;

  const project = getProjectById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (project.owner !== userId) return res.status(403).json({ message: 'Not authorized' });

  deleteProject(projectId);
  res.status(200).json({ message: 'Project deleted' });
};

exports.getProjectById = (req, res) => {
  const { projectId } = req.params;
  const project = getProjectById(projectId);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.status(200).json(project);
};
