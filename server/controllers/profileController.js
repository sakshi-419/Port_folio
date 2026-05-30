const Profile = require('../models/Profile');
const { cloudinary } = require('../config/cloudinary');

// @desc  Get profile (public)
// @route GET /api/profile
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update profile
// @route PUT /api/profile
// @access Private
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();

    const {
      name, tagline, bio, education, currentLearning,
      roles, careerGoals,
    } = req.body;

    if (name !== undefined) profile.name = name;
    if (tagline !== undefined) profile.tagline = tagline;
    if (bio !== undefined) profile.bio = bio;
    if (careerGoals !== undefined) profile.careerGoals = careerGoals;

    if (education) {
      profile.education = typeof education === 'string' ? JSON.parse(education) : education;
    }
    if (currentLearning) {
      profile.currentLearning = typeof currentLearning === 'string' ? JSON.parse(currentLearning) : currentLearning;
    }
    if (roles) {
      profile.roles = typeof roles === 'string' ? JSON.parse(roles) : roles;
    }

    if (req.file) {
      if (profile.profileImagePublicId) {
        await cloudinary.uploader.destroy(profile.profileImagePublicId);
      }
      profile.profileImage = req.file.path;
      profile.profileImagePublicId = req.file.filename;
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile };
