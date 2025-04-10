const { AttributeProperty } = require('../../models');

exports.updatePropertyAttributes = async (property, attributes) => {
    try {
        if(attributes && attributes.length > 0) {
            await AttributeProperty.destroy({
                where: {
                    property_id: property.id
                }
            });
            
            for (const attribute of attributes) {
                await AttributeProperty.create({
                    property_id: property.id,   
                    attribute_id: attribute.attribute_id,
                    value: attribute.value
                });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};
