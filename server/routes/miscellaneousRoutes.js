const express = require('express');
const router = express.Router();
const miscellaneousController = require('../controllers/miscellaneousController');
const auth = require('../middleware/auth');

// Get amenities
router.get('/amenities', auth, miscellaneousController.getAmenities);

// Get attributes
router.get('/attributes', auth, miscellaneousController.getAttributes);

module.exports = router;