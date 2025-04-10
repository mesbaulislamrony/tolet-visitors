const { Property, User, PropertyImage, AmenityProperty } = require('../models');
const { Op } = require('sequelize');
const { findPropertyWithAuth } = require('../services/property/findPropertyWithAuth');
const { updatePropertyAmenities } = require('../services/property/updatePropertyAmenities');
const { updatePropertyImages } = require('../services/property/updatePropertyImages');
const { updatePropertyAttributes } = require('../services/property/updatePropertyAttributes');


exports.createProperty = async (req, res) => {
    try {
        const property = await Property.create({
            ...req.body,
            user_id: req.user.id,
        });

        await updatePropertyAmenities(property, req.body.amenities);
        await updatePropertyImages(property, req.body.images);
        await updatePropertyAttributes(property, req.body.attributes);
        
        res.json({ data: { message: 'Property created successfully' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error creating property', error: error.message }});
    }
};

exports.getProperties = async (req, res) => {
    try {
        const { type, city, minPrice, maxPrice } = req.query;
        
        const where = {};
        where.user_id = req.user.id;
        if (type) where.type = type;
        if (city) where.city = city;
        if (minPrice) where.price = { [Op.gte]: minPrice };
        if (maxPrice) where.price = { [Op.lte]: maxPrice };
        
        const properties = await Property.findAll({
            include: [{
                model: User,
                attributes: ['id', 'name', 'email'],
                as: 'user',
            }],
            where,
            attributes: ['id', 'type', 'title', 'city', 'state', 'price', 'address', 'thumbnail', 'updated_at'],
            order: [['updated_at', 'DESC']]
        });
        
        res.json({ data: properties });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error fetching properties', error: error.message }});
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await findPropertyWithAuth(req.params.id, req);
    
        if (!property) {
            return res.status(404).json({ data: { message: 'Property not found' }});
        }
        
        res.json({ data: property });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error fetching properties', error: error.message }});
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await findPropertyWithAuth(req.params.id, req);
    
        if (!property) {
            return res.status(404).json({ data: { message: 'Property not found' }});
        }
        
        await property.update(req.body);
        await updatePropertyAmenities(property, req.body.amenities);
        await updatePropertyImages(property, req.body.images);
        await updatePropertyAttributes(property, req.body.attributes);

        res.json({ data: { message: 'Property updated successfully' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error updating properties', error: error.message }});
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await findPropertyWithAuth(req.params.id, req);
    
        if (!property) {
            return res.status(404).json({ data: { message: 'Property not found' }});
        }
        
        await property.destroy();
        res.json({ data: { message: 'Property deleted successfully' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error deleting property', error: error.message }});
    }
};