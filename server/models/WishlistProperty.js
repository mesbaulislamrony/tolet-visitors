const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const WishlistProperty = sequelize.define('wishlist_property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
WishlistProperty.associate = (models) => {
    WishlistProperty.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'property_id',
    });
    WishlistProperty.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
    });
};

module.exports = WishlistProperty;