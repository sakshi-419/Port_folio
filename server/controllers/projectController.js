const Project = require('../models/Project');
const { cloudinary } = require('../config/cloudinary');

// @desc  Get all projects (public)
// @route GET /api/projects
const getProjects = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single project
// @route GET /api/projects/:id
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create project
// @route POST /api/projects
// @access Private
const createProject = async (req, res) => {
  try {
    const { title, description, category, techStack, githubUrl, liveUrl, featured, order } = req.body;
    const project = new Project({
      title, description, category,
      techStack: typeof techStack === 'string' ? JSON.parse(techStack) : techStack || [],
      githubUrl, liveUrl, featured, order,
    });
    if (req.file) {
      project.image = req.file.path;
      project.imagePublicId = req.file.filename;
    }
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update project
// @route PUT /api/projects/:id
// @access Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { title, description, category, techStack, githubUrl, liveUrl, featured, order } = req.body;
    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (category !== undefined) project.category = category;
    if (techStack !== undefined) project.techStack = typeof techStack === 'string' ? JSON.parse(techStack) : techStack;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (featured !== undefined) project.featured = featured;
    if (order !== undefined) project.order = order;

    if (req.file) {
      if (project.imagePublicId) {
        await cloudinary.uploader.destroy(project.imagePublicId);
      }
      project.image = req.file.path;
      project.imagePublicId = req.file.filename;
    }

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete project
// @route DELETE /api/projects/:id
// @access Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
