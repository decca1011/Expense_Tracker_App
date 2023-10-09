const ExpenseModel = require('../models/expense'); // Assuming you have a UserModel defined in models/user.js
const User = require('../models/userData');  // Controller function to insert a new user
const sequelize = require('../util/database'); 
const getExpense = require('./expense')




const  get_your_report = async (req, res) => {  
   try { 
               
       await  getExpense.getAllExpense(req,res)
   
     } catch (error) {
       console.error('Error retrieving expense data:', error);
       res.status(500).json({ error: 'Failed to retrieve expense data' });
     }

}

module.exports = {
 get_your_report
}
