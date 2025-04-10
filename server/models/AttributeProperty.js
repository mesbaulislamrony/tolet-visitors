const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AttributeProperty = sequelize.define('attribute_property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    property_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Define associations
AttributeProperty.associate = (models) => {
    AttributeProperty.belongsTo(models.Attribute, {
        as: 'attribute',
        foreignKey: 'attribute_id',
    });
    AttributeProperty.belongsTo(models.Property, {
        as: 'property',
        foreignKey: 'property_id',
    });
};

module.exports = AttributeProperty;