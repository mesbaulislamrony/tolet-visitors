const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./server/config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

// Sync models with database
// sequelize.sync()
//     .then(() => {
//         console.log('Models synchronized with database');
//     })
//     .catch(err => {
//         console.error('Error syncing models:', err);
//     });

// Routes
app.use('/api/auth', require('./server/routes/authRoutes'));
app.use('/api/properties', require('./server/routes/propertyRoutes'));
app.use('/api/profile', require('./server/routes/profileRoutes'));
app.use('/api/miscellaneous', require('./server/routes/miscellaneousRoutes'));
app.use('/api/wishlist', require('./server/routes/wishlistRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});