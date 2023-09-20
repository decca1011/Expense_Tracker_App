const { response } = require('express');
const ExpenseModel = require('../models/expense'); // Assuming you have a UserModel defined in models/user.js
// Controller function to insert a new user
const User = require('../models/userData');
const { INTEGER } = require('sequelize');
exports.insertExpense =  (req, res,next) => {

  const Amount =req.body.Amount;
  const des =req.body.des;
  const category = req.body.category;
 const userId = req.user.id
  //console.log(req.user.total)
  var x = parseInt(req.user.total)
  var y = parseInt(Amount)


  var amount = y + x
  console.log('type ====================================> ',typeof(x)+ typeof( y) ,'    ____', typeof(amount) + amount)
  req.user.update({ total: amount}),
 
      // Use UserModel.create function to insert the user into the database
 ExpenseModel.create({
      Amount : Amount,
      des: des,
    category: category,
   userId: userId
    })
    .then(result => {
      const responseData = {
        id: result.id,
        Amount: result.Amount,
        des: result.des,
        category: result.category,
        // Add other properties if needed
      };
      
     // console.log("user Data collected", result )
      res.status(201).json(responseData);
    
    })
    .catch (error => {  console.error('Error inserting  DAta:', error);
      res.status(500).json({ error: 'Failed to insert Expense'})
  })
}

 

exports.getAllExpense = async (req, res, next) => {
  try {
    // Find all expenses associated with the user
    const expenses = await ExpenseModel.findAll({ where: { userId: req.user.id } });

    // Map the expenses to a desired format
    const expenseData = expenses.map(expense => ({
      id: expense.id,
      Amount: expense.Amount,
      des: expense.des,
      category: expense.category,
      // Add other properties you want to include
    }));

    // Fetch user data (if needed)
    const user = await User.findByPk(req.user.id);
//console.log(Boolean(user.isUserPremeuim), user.username)
var ispremium = (user.isUserPremeuim)
var ispremium = user.isUserPremeuim; 
//console.log(ispremium);
 if(user.isUserPremeuim === '0'){
  ispremium = false;
 }
 else{
  ispremium = true
 }
//console.log(ispremium)
    // Send the formatted expense data as a response
    res.status(200).json({expenseData,ispremium});
  } catch (error) {
    console.error('Error retrieving expense data:', error);
    res.status(500).json({ error: 'Failed to retrieve expense data' });
  }
};
