const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middleware/auth');

// Create new property
router.post('/', auth, propertyController.createProperty);

// Get all properties with optional filters
router.get('/', auth, propertyController.getProperties);

// Get single property by ID
router.get('/:id', auth, propertyController.getPropertyById);

// Update property
router.put('/:id', auth, propertyController.updateProperty);

// Delete property
router.delete('/:id', auth, propertyController.deleteProperty);

module.exports = router;