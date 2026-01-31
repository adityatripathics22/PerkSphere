const express = require('express');
const { getAllDeals, getDealById } = require('../controllers/dealController');
const { claimDeal } = require('../controllers/claimController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllDeals);
router.get('/:id', getDealById);
router.post('/:id/claim', protect, claimDeal);

module.exports = router;
