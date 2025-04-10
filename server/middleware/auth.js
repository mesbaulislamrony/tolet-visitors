const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ data: { message: 'No token, authorization denied' } });
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ data: { message: 'No user, authorization denied' } });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ data: { message: 'Token is not valid' } });
    }
};