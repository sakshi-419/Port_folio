const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Programming', 'Web Development', 'Databases', 'Data Analytics', 'AI Tools', 'Machine Learning'],
    required: true,
  },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
