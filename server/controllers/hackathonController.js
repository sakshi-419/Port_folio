const Hackathon = require('../models/Hackathon');
const { cloudinary } = require('../config/cloudinary');

const getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ order: 1, createdAt: -1 });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHackathon = async (req, res) => {
  try {
    const { hackathonName, projectName, description, teamSize, technologies, githubUrl, certificateUrl, date, result, order } = req.body;
    const hackathon = new Hackathon({
      hackathonName, projectName, description, teamSize, githubUrl, certificateUrl, date, result, order,
      technologies: typeof technologies === 'string' ? JSON.parse(technologies) : technologies || [],
    });
    if (req.file) {
      hackathon.image = req.file.path;
      hackathon.imagePublicId = req.file.filename;
    }
    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ message: 'Hackathon not found' });

    const fields = ['hackathonName', 'projectName', 'description', 'teamSize', 'githubUrl', 'certificateUrl', 'date', 'result', 'order'];
    fields.forEach(f => { if (req.body[f] !== undefined) hackathon[f] = req.body[f]; });

    if (req.body.technologies !== undefined) {
      hackathon.technologies = typeof req.body.technologies === 'string' ? JSON.parse(req.body.technologies) : req.body.technologies;
    }
    if (req.file) {
      if (hackathon.imagePublicId) await cloudinary.uploader.destroy(hackathon.imagePublicId);
      hackathon.image = req.file.path;
      hackathon.imagePublicId = req.file.filename;
    }
    await hackathon.save();
    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ message: 'Hackathon not found' });
    if (hackathon.imagePublicId) await cloudinary.uploader.destroy(hackathon.imagePublicId);
    await hackathon.deleteOne();
    res.json({ message: 'Hackathon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHackathons, createHackathon, updateHackathon, deleteHackathon };
