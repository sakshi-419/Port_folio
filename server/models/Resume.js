const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['General', 'Software Development', 'Data Analytics', 'AI/ML'],
    required: true,
  },
  description: { type: String, default: '' },
  pdfUrl: { type: String, required: true },
  pdfPublicId: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
