const Timeline = require('../models/Timeline');

const getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ order: 1, year: -1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTimeline = async (req, res) => {
  try {
    const { year, title, description, icon, type, order } = req.body;
    const entry = await Timeline.create({ year, title, description, icon, type, order });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTimeline = async (req, res) => {
  try {
    const entry = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!entry) return res.status(404).json({ message: 'Timeline entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTimeline = async (req, res) => {
  try {
    const entry = await Timeline.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Timeline entry not found' });
    res.json({ message: 'Timeline entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTimeline, createTimeline, updateTimeline, deleteTimeline };
