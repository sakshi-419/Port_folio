const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  hackathonName: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, default: '' },
  teamSize: { type: Number, default: 1 },
  technologies: [{ type: String }],
  githubUrl: { type: String, default: '' },
  certificateUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  date: { type: String, default: '' },
  result: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Hackathon', hackathonSchema);
