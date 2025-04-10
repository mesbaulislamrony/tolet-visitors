const { AmenityProperty } = require('../../models');

exports.updatePropertyAmenities = async (property, amenities) => {
    try {
        if(amenities && amenities.length > 0) {
            await AmenityProperty.destroy({
                where: {
                    property_id: property.id
                }
            });
            
            for (const amenity of amenities) {
                await AmenityProperty.create({
                    property_id: property.id,
                    amenity_id: amenity
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
