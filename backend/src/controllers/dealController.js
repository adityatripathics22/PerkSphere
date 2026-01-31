const Deal = require('../models/Deal');

exports.getAllDeals = async (req, res) => {
  try {
    const { category, access } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (access === 'locked') filter.isLocked = true;
    if (access === 'unlocked') filter.isLocked = false;

    const deals = await Deal.find(filter).sort({ createdAt: -1 });
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deals.' });
  }
};

exports.getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }
    res.json(deal);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch deal.' });
  }
};
