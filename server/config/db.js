const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'test',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    }
);

module.exports = sequelize;