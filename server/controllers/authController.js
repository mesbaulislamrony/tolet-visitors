const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ data: { message: 'User already exists' } });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });
        
        // Create token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );
        
        res.status(200).json({ data: { token, refresh_token: "", token_type: 'Bearer' } });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error creating user', error: error.message } });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ data: { message: 'Invalid credentials' } });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ data: { message: 'Invalid credentials' } });
        }
        
        // Create token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );
        
        res.status(200).json({ data: { token, refresh_token: "", token_type: 'Bearer' } });
    } catch (error) {
        res.status(500).json({ data: { message: 'Error logging in', error: error.message } });
    }
};