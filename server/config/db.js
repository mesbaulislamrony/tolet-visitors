const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'tolet_system',
    process.env.MYSQL_USER || 'mesbaul',
    process.env.MYSQL_PASSWORD || 'loll0llol',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    }
);

module.exports = sequelize;