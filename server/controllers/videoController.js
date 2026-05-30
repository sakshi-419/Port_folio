const Video = require('../models/Video');
const { cloudinary } = require('../config/cloudinary');

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ order: 1, createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const { title, description, youtubeUrl, aiTools, order } = req.body;
    const video = new Video({
      title, description, youtubeUrl, order,
      aiTools: typeof aiTools === 'string' ? JSON.parse(aiTools) : aiTools || [],
    });
    if (req.file) {
      video.thumbnail = req.file.path;
      video.thumbnailPublicId = req.file.filename;
    }
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const { title, description, youtubeUrl, aiTools, order } = req.body;
    if (title !== undefined) video.title = title;
    if (description !== undefined) video.description = description;
    if (youtubeUrl !== undefined) video.youtubeUrl = youtubeUrl;
    if (aiTools !== undefined) video.aiTools = typeof aiTools === 'string' ? JSON.parse(aiTools) : aiTools;
    if (order !== undefined) video.order = order;

    if (req.file) {
      if (video.thumbnailPublicId) await cloudinary.uploader.destroy(video.thumbnailPublicId);
      video.thumbnail = req.file.path;
      video.thumbnailPublicId = req.file.filename;
    }
    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.thumbnailPublicId) await cloudinary.uploader.destroy(video.thumbnailPublicId);
    await video.deleteOne();
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVideos, createVideo, updateVideo, deleteVideo };
