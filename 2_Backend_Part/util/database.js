
const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_track_user_data', 'root', 'Sober@9#9373003764', { dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
