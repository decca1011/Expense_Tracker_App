const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root','Sober@9#9373003764', {
dialect: 'mysql',
host: 'localhost',
password: 'Sober@9#9373003764'
})

module.exports = sequelize;