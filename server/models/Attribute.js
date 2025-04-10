const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Attribute = sequelize.define('attributes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Attribute.associate = (models) => {    
    Attribute.belongsToMany(models.Property, {
        through: 'attribute_property',
        foreignKey: 'attribute_id'
    });
};

module.exports = Attribute;