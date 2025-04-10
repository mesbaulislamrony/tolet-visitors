const WishlistProperty = require('../models/WishlistProperty');
const Property = require('../models/Property');
const User = require('../models/User');
const { findPropertyWithAuth } = require('../services/property/findPropertyWithAuth');

// Get wishlists
exports.getWishlist = async (req, res) => {
    try {
        const properties = await Property.findAll(
            {
                include: [
                    {
                        model: User,
                        as: 'users',
                        attributes: [],
                        where: {
                            id: req.user.id
                        },
                    },
                    {
                        model: User,
                        attributes: ['id', 'name', 'email'],
                        as: 'user',
                    }
                ],
                attributes: ['id', 'type', 'title', 'city', 'state', 'price', 'address', 'thumbnail', 'updated_at'],
                order: [['updated_at', 'DESC']]
            }
        );
        
        res.json({ data: properties });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error fetching wishlist', error: error.message }});
    }
};  

// Create wishlist
exports.createWishlist = async (req, res) => {

    try {

        const property = await findPropertyWithAuth(req.body.property_id, req);

        if (!property) {
            return res.status(404).json({ data: { message: 'Property not found' }});
        }
        
        await WishlistProperty.create({
            property_id: property.id,
            user_id: req.user.id,
        });
        
        res.json({ data: { message: 'Property added to wishlist' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error creating wishlist', error: error.message }});
    }
};

// Delete wishlist
exports.deleteWishlist = async (req, res) => {
    try {
        await WishlistProperty.destroy({
            where: {
                user_id: req.user.id,
                property_id: req.params.id
            }
        });
        
        res.json({ data: { message: 'Property removed from wishlist' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error deleting wishlist', error: error.message }});
    }
};
