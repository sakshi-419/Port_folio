const express = require('express');
const router = express.Router();
const { getTimeline, createTimeline, updateTimeline, deleteTimeline } = require('../controllers/timelineController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getTimeline);
router.post('/', protect, createTimeline);
router.put('/:id', protect, updateTimeline);
router.delete('/:id', protect, deleteTimeline);

module.exports = router;
