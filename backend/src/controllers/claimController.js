const Claim = require('../models/Claim');
const Deal = require('../models/Deal');

exports.claimDeal = async (req, res) => {
  try {
    const dealId = req.params.id;
    const userId = req.user._id;

    const deal = await Deal.findById(dealId);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found.' });
    }

    if (deal.isLocked && !req.user.isVerified) {
      return res.status(403).json({
        message: 'This deal requires verification. Please get verified to claim locked deals.',
      });
    }

    const existing = await Claim.findOne({ user: userId, deal: dealId });
    if (existing) {
      return res.status(400).json({ message: 'You have already claimed this deal.' });
    }

    const claim = await Claim.create({ user: userId, deal: dealId });
    const populated = await Claim.findById(claim._id).populate('deal');
    res.status(201).json(populated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You have already claimed this deal.' });
    }
    res.status(500).json({ message: 'Failed to claim deal.' });
  }
};

exports.getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id })
      .populate('deal')
      .sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your claims.' });
  }
};
