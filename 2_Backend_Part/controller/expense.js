const ExpenseModel = require('../models/expense'); // Assuming you have a UserModel defined in models/user.js
const User = require('../models/userData');  // Controller function to insert a new user

exports.insertExpense = async (req, res,next) => {
try {
      const Amount =req.body.Amount;
      const des =req.body.des;
      const category = req.body.category;
      const userId = req.user.id

      // Use UserModel.create function to insert the user into the database
      const create_Expense = await ExpenseModel.create({
            Amount : Amount,
            des: des,
           category: category,
           userId: userId
       })
       
       // Create a response object with the expense data
       const responseData = {
                id: create_Expense.id,
                Amount: create_Expense.Amount,
                des: create_Expense.des,
                category: create_Expense.category,
              };  
      // Send the response
      res.status(201).json(responseData); 

    }  catch (err) {
  console.error('Error inserting  DAta:', error);
  res.status(500).json({ error: 'Failed to insert Expense'})
   }
}

exports.getAllExpense = async (req, res, next) => {
  try {
    // Find all expenses associated with the user
    const expenses = await ExpenseModel.findAll({ 
      where: { userId: req.user.id } , 
      attributes:['id','Amount','des','category']
     });

    // Map the expenses to a desired format
    const expenseData = expenses.map(expense => ({
      id: expense.id,
      Amount: expense.Amount,
      des: expense.des,
      category: expense.category,
    }));

    // Fetch user data (if needed)
    const user = await User.findByPk(req.user.id); 
    const ispremium = Boolean(user.isUserPremeuim);
    console.log(ispremium);

    // Send the formatted expense data as a response
    res.status(200).json({expenseData,ispremium});
  } catch (error) {
    console.error('Error retrieving expense data:', error);
    res.status(500).json({ error: 'Failed to retrieve expense data' });
  }
};
