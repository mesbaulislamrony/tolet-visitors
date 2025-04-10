const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Import models
const User = require('./User');
const Property = require('./Property');
const Attribute = require('./Attribute');
const AttributeProperty = require('./AttributeProperty');
const PropertyImage = require('./PropertyImage');
const Amenity = require('./Amenity');
const AmenityProperty = require('./AmenityProperty');
const WishlistProperty = require('./WishlistProperty');

// Initialize models
const models = {
    User,
    Property,
    PropertyImage,
    Amenity,
    AmenityProperty,
    Attribute,
    AttributeProperty,
};

// Define relationships
Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

module.exports = models;