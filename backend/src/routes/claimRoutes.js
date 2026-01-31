const express = require('express');
const { claimDeal, getMyClaims } = require('../controllers/claimController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getMyClaims);

module.exports = router;
