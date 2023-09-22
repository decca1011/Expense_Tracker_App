const User = require("../models/userData");
 const Expense = require('../models/expense')
 const sequelize = require('../util/database'); 
const { response } = require("express");
 
const get_Dashboard = async (req,res) => {
try{
  //  const All_user = await User.findAll({
  //     attributes: ['id', 'username', [sequelize.fn('sum', sequelize.col('Amount')), 'total_cost']],
  //     include: [ {
  //         model: Expense,
  //         attributes: []
  //       } ],
  //     group: ['User.id'], order: [['total_cost', 'DESC']]
  //   });
  const All_user = await User.findAll({
    attributes: ['id', 'username', 'total'],
    group: ['User.id'], order: [['total', 'DESC']]
  });
 
    const transformedResult = All_user.map((user) => ({
      username: user.dataValues.username,
      total_cost: user.dataValues.total,
    }));
console.log(transformedResult) 
res.status(200).json(transformedResult);
} 
catch (err) { console.log(err) }
};

module.exports = get_Dashboard



