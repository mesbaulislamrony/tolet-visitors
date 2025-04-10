const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PropertyImage = sequelize.define('property_images', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
PropertyImage.associate = (models) => {
    PropertyImage.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'property_id',
    });
};

module.exports = PropertyImage;