const ExpenseModel = require('../models/expense'); // Assuming you have a UserModel defined in models/user.js
// Controller function to insert a new user
exports.insertExpense =  (req, res,next) => {

  const Amount =req.body.Amount;
  const des =req.body.des;
  const category = req.body.category;
 const userId = req.user.id
  console.log(req.user.id)
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
      
      console.log("user Data collected", result )
      res.status(201).json(responseData);
    
    })
    .catch (error => {  console.error('Error inserting  DAta:', error);
      res.status(500).json({ error: 'Failed to insert Expense'})
  })
}


exports.getAllExpense = (req, res, next) => {

  ExpenseModel.findAll({where : { userId: req.user.id}})
    .then(expense => {
      const expenseData = expense.map(expense => {
        return {
          id: expense.id,
          Amount: expense.Amount,
          des: expense.des,
          category: expense.category,
          // Add other properties you want to include
        };
      });
       
      //console.log("Retrieved all expense:", expense);
     // const expenseData = expense.map(expense => expense.toJSON());
     // console.log(expense , " ddde" , expense, req.body ,req.user.id)
      res.status(200).json(expenseData) ;
    })
    .catch(error => {
      console.error('Error retrieving expense data:', error);
      console.log('xyz')
      res.status(500).json({ error: 'Failed to retrieve  expense data' });
    });
};
