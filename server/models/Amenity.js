const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Amenity = sequelize.define('amenities', {
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

Amenity.associate = (models) => {    
    Amenity.belongsToMany(models.Property, {
        through: 'amenity_property',
        foreignKey: 'amenity_id'
    });
};

module.exports = Amenity;