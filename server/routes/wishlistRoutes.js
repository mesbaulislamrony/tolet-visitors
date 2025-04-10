const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const wishlistController = require('../controllers/wishlistController');

// Get wishlist
router.get('/', auth, wishlistController.getWishlist);

// Create wishlist
router.post('/', auth, wishlistController.createWishlist);

// Delete wishlist
router.delete('/:id', auth, wishlistController.deleteWishlist);

module.exports = router;