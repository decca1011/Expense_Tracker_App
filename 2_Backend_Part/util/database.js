require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_TABLE, 'root', process.env.DATABASE_PASSWORD, 
{ dialect: 'mysql',
 host: 'localhost',


});

module.exports = sequelize;
