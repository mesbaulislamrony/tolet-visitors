const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

// Get user profile
router.get('/', auth, profileController.getProfile);

// Update user profile
router.put('/', auth, profileController.updateProfile);

// Verify email
router.post('/verify-email', auth, profileController.verifyEmail);

// Update password
router.put('/password', auth, profileController.updatePassword);

module.exports = router;