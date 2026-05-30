const express = require('express');
const router = express.Router();
const { getVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/authMiddleware');
const { thumbnailUpload } = require('../config/cloudinary');

router.get('/', getVideos);
router.post('/', protect, thumbnailUpload.single('thumbnail'), createVideo);
router.put('/:id', protect, thumbnailUpload.single('thumbnail'), updateVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;
