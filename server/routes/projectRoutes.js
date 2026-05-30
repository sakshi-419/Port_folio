const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { imageUpload } = require('../config/cloudinary');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, imageUpload.single('image'), createProject);
router.put('/:id', protect, imageUpload.single('image'), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
