 // controllers/edit.js
 const Expense = require('../models/expense'); // UserModel defined in models/user.js
  
exports.deleteExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.expenseId; // 
        const expense = await Expense.findByPk(expenseId)
        // If the expense does not exist, return a 404 error
        if (!expense) {
        return res.status(404).json({ error: 'Expense not found' })
        }
        await expense.destroy() 

        res.status(200).json({ message: 'User deleted successfully' });

    } catch(err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
    }
};

 exports.editExpense = async (req, res, next) => {
  try {
        const expenseId = req.body.expenseId;
        const updatedAmount= req.body.Amount;
        const updateddes = req.body.des;
        const updatedcategory= req.body.category;
 
        const Edit_expense = await Expense.findByPk(expenseId)
     
        if (!Edit_expense) { return res.status(404).json({ error: 'User not found' }) };
  
        Edit_expense.Amount = updatedAmount;
        Edit_expense.des = updateddes;
        Edit_expense.category = updatedcategory;
  
        await Edit_expense.save();

        res.status(200).json(Edit_expense ); // customize the response as needed
   
     }  catch (err) {
       res.status(500).json({ error: 'Failed to update user' });
       }
  
 };
 

 



