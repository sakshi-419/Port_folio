const express = require('express');
const router = express.Router();
const { getHackathons, createHackathon, updateHackathon, deleteHackathon } = require('../controllers/hackathonController');
const { protect } = require('../middleware/authMiddleware');
const { imageUpload } = require('../config/cloudinary');

router.get('/', getHackathons);
router.post('/', protect, imageUpload.single('image'), createHackathon);
router.put('/:id', protect, imageUpload.single('image'), updateHackathon);
router.delete('/:id', protect, deleteHackathon);

module.exports = router;
