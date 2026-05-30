const Resume = require('../models/Resume');
const { cloudinary } = require('../config/cloudinary');

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ order: 1, createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createResume = async (req, res) => {
  try {
    const { title, category, description, order } = req.body;
    if (!req.file) return res.status(400).json({ message: 'PDF file is required' });
    const resume = await Resume.create({
      title, category, description, order,
      pdfUrl: req.file.path,
      pdfPublicId: req.file.filename,
    });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const fields = ['title', 'category', 'description', 'order'];
    fields.forEach(f => { if (req.body[f] !== undefined) resume[f] = req.body[f]; });

    if (req.file) {
      if (resume.pdfPublicId) await cloudinary.uploader.destroy(resume.pdfPublicId, { resource_type: 'raw' });
      resume.pdfUrl = req.file.path;
      resume.pdfPublicId = req.file.filename;
    }
    await resume.save();
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    if (resume.pdfPublicId) await cloudinary.uploader.destroy(resume.pdfPublicId, { resource_type: 'raw' });
    await resume.deleteOne();
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getResumes, createResume, updateResume, deleteResume };
