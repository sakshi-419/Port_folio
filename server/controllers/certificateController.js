const Certificate = require('../models/Certificate');
const { cloudinary } = require('../config/cloudinary');

const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ order: 1, createdAt: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { name, issuer, date, credentialUrl, order } = req.body;
    const cert = new Certificate({ name, issuer, date, credentialUrl, order });
    if (req.file) {
      cert.image = req.file.path;
      cert.imagePublicId = req.file.filename;
    }
    await cert.save();
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });

    const fields = ['name', 'issuer', 'date', 'credentialUrl', 'order'];
    fields.forEach(f => { if (req.body[f] !== undefined) cert[f] = req.body[f]; });

    if (req.file) {
      if (cert.imagePublicId) await cloudinary.uploader.destroy(cert.imagePublicId);
      cert.image = req.file.path;
      cert.imagePublicId = req.file.filename;
    }
    await cert.save();
    res.json(cert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    if (cert.imagePublicId) await cloudinary.uploader.destroy(cert.imagePublicId);
    await cert.deleteOne();
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
