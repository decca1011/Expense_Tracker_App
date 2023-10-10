 
const ExpenseModel = require('../models/expense'); // Assuming you have a UserModel defined in models/user.js
 
const getExpense = async (req,res) => {
   try {
      const Item_Per_page = 5;
      const page = parseInt(req.query.page);
      // const limit = parseInt(req.query.limit);  
     
      // Find all expenses associated with the user
                     // const expenses = await ExpenseModel.findAll({ 
                     //   where: { userId: req.user.id } , 
                     //   attributes:['id','Amount','Income' ,'des','category']
                     //  });
      const expenses = await ExpenseModel.findAll({ 
         offset: (page-1)*Item_Per_page,
         limit: Item_Per_page,
         where: { userId: req.user.id } , 
         attributes:['id','Amount','Income' ,'des','category']
        });
 
  
      // Map the expenses to a desired format
      const expenseData = expenses.map(expense => ({
        id: expense.id,
        Amount: expense.Amount,
        Income: expense.Income,
        des: expense.des,
        category: expense.category,
      }));
console.log(expenseData)
        return expenseData;

   }
   catch (err ) {
      console.error('Error retrieving expense data:', err);
      res.status(500).json({ error: 'Failed to retrieve expense data' });
   }
}

module.exports = {
   getExpense
}