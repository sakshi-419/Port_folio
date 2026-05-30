const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const { imageUpload } = require('../config/cloudinary');

router.get('/', getProfile);
router.put('/', protect, imageUpload.single('profileImage'), updateProfile);

module.exports = router;
