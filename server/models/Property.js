const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Property = sequelize.define('properties', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('flat', 'apartment', 'house', 'land', 'office', 'shop', 'garage', 'other'),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'rented', 'sold'),
        defaultValue: 'available'
    },
    thumbnail: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
Property.associate = (models) => {
    Property.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
    });
    Property.hasMany(models.PropertyImage, {
        as: 'images',
        foreignKey: 'property_id',
    });
    Property.belongsToMany(models.Attribute, {
        through: 'attribute_property',
        foreignKey: 'property_id',
        as: 'attributes'
    });
    Property.belongsToMany(models.Amenity, {
        through: 'amenity_property',
        foreignKey: 'property_id',
        as: 'amenities'
    });
    Property.belongsToMany(models.User, {
        through: 'wishlist_property',
        foreignKey: 'property_id',
        as: 'users'
    });
};

module.exports = Property;