const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Sakshi Choudhary' },
  tagline: { type: String, default: 'Second-Year Undergraduate Student' },
  bio: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  profileImagePublicId: { type: String, default: '' },
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      year: String,
    }
  ],
  currentLearning: [{ type: String }],
  roles: [{ type: String }],
  careerGoals: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
