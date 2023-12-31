const Sequelize = require('sequelize');

const sequelize = require('../util/database');
 

const User = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
  
    username: Sequelize.STRING,
 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
            isEmail: true, // Validate email format
            
        },
          
    },
    password: Sequelize.STRING,
     mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure mobile is unique
         
    },
     
    isUserPremeuim: Sequelize.STRING ,
    
   total: Sequelize.INTEGER

});

module.exports = User;
