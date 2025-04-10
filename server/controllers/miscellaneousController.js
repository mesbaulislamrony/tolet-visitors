const Amenity = require('../models/Amenity');
const Attribute = require('../models/Attribute');

// Get amenities
exports.getAmenities = async (req, res) => {
    try {
        const amenities = await Amenity.findAll(
            {
                attributes: ['id', 'name']
            }
        );
        
        res.json({ data: amenities });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error fetching amenities', error: error.message }});
    }
};  

// Get attributes
exports.getAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.findAll(
            {
                attributes: ['id', 'name']
            }
        );
        
        res.json({ data: attributes });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error fetching attributes', error: error.message }});
    }
};
