
const  Sequelize = require('sequelize');
const sequelize = require('../util/database'); 
const Expence = sequelize.define('expence', {
  id: {
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Amount: {
    type:Sequelize.INTEGER,
    allowNull: false,
  },
  des: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
     //unique: true,
  }
});

module.exports = Expence;
