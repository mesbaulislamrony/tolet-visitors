const { PropertyImage } = require('../../models');

exports.updatePropertyImages = async (property, images) => {
    try {
        if(images && images.length > 0) {
            await PropertyImage.destroy({
                where: {
                    property_id: property.id
                }
            });
            
            for (const image of images) {
                await PropertyImage.create({
                    property_id: property.id,
                    image: image
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
