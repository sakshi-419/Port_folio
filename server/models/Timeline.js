const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '📌' },
  type: {
    type: String,
    enum: ['education', 'project', 'achievement', 'learning', 'other'],
    default: 'other',
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Timeline', timelineSchema);
