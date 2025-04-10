const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        // User is already verified in auth middleware
        const user = await User.findByPk(req.user.id);
        
        if (!user) {
            return res.status(404).json({ data: { message: 'User not found' }});
        }

        res.json({ data: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error fetching user profile', error: error.message }});
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ data: { message: 'User not found' }});
        }

        user.name = name;
        user.email = email;
        await user.save();

        res.json({ data: { message: 'Profile updated successfully' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error updating profile', error: error.message }});
    }
};

// Verify email
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ data: { message: 'User not found' }});
        }

        user.email_verified_at = new Date();
        await user.save();

        res.json({ data: { message: 'Email verified successfully' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error verifying email', error: error.message }});
    }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ data: { message: 'User not found' }});
        }
        
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ data: { message: 'Invalid current password' }});
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        
        res.json({ data: { message: 'Password updated successfully' }});
    } catch (error) {
        res.status(500).json({ data: { message: 'Error updating password', error: error.message }});
    }
};
