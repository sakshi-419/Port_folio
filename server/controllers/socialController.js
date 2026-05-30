const SocialLink = require('../models/SocialLink');

const getSocialLinks = async (req, res) => {
  try {
    const links = await SocialLink.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const upsertSocialLinks = async (req, res) => {
  try {
    // req.body = [{ platform, url, icon }, ...]
    const links = Array.isArray(req.body) ? req.body : [req.body];
    const results = [];
    for (const link of links) {
      const result = await SocialLink.findOneAndUpdate(
        { platform: link.platform },
        { url: link.url, icon: link.icon },
        { upsert: true, new: true }
      );
      results.push(result);
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSocialLink = async (req, res) => {
  try {
    await SocialLink.findByIdAndDelete(req.params.id);
    res.json({ message: 'Social link deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSocialLinks, upsertSocialLinks, deleteSocialLink };
