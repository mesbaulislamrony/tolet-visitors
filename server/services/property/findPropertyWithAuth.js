const { Property, User, PropertyImage, Amenity, Attribute, AmenityProperty, AttributeProperty } = require('../../models');

exports.findPropertyWithAuth = async (id, req) => {
    const property = await Property.findByPk(id, {
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'email'],
                as: 'user',
            },
            {
                model: PropertyImage,
                attributes: ['id', 'image'],
                as: 'images',
            },
            {
                model: Amenity,
                attributes: ['id', 'name'],
                as: 'amenities',
                through: {
                    attributes: [],
                    model: AmenityProperty,
                    as: 'amenity_property'
                },
            },
            {
                model: Attribute,
                attributes: ['id', 'name'],
                as: 'attributes',
                through: {
                    model: AttributeProperty,
                    attributes: ['value'],
                    as: 'attribute_property'
                },
            }
        ],
        where: {
            id: req.user.id
        },
        attributes: ['id', 'type', 'title', 'description', 'city', 'state', 'price', 'address', 'thumbnail', 'updated_at'],
    });
    return property;
}