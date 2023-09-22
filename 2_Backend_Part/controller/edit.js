 // controllers/edit.js
 const Expense = require('../models/expense'); // UserModel defined in models/user.js
 const User = require('../models/userData')
  
exports.deleteExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.expenseId; // 
        const expense = await Expense.findByPk(expenseId)
        // If the expense does not exist, return a 404 error
        if (!expense) {
        return res.status(404).json({ error: 'Expense not found' })
        }

        const user = await User.findByPk(expense.userId)
        // Update the user's total balance
  
        if (!user) {
         return res.status(404).json({ error: 'User not found' });
       }
       // Update the user's total balance
       const updatedTotal = parseInt(user.total) - parseInt(expense.Amount)
       await user.update({ total: updatedTotal},);
  

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

        const user = await User.findByPk(Edit_expense.userId)
        if (!user) { return res.status(404).json({ error: 'User not found' }) }
        const updatedTotal = parseInt(user.total) - parseInt(Edit_expense.Amount) + parseInt(updatedAmount)
        await user.update({ total: updatedTotal},);
     
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
 

 



