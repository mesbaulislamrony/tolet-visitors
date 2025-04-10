const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AmenityProperty = sequelize.define('amenity_property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amenity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
AmenityProperty.associate = (models) => {
    AmenityProperty.belongsTo(models.Amenity, {
        as: 'amenity',
        foreignKey: 'amenity_id',
    });
    AmenityProperty.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'property_id',
    });
};

module.exports = AmenityProperty;