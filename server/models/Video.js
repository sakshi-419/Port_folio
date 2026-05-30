const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  thumbnailPublicId: { type: String, default: '' },
  aiTools: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
