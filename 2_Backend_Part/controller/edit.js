 // controllers/edit.js
 const UserModel = require('../models/expense'); // UserModel defined in models/user.js
  
 exports.deleteExpense = (req, res, next) => {
   
   const expenseId = req.params.expenseId; // 
   UserModel.findByPk(expenseId)
     .then(user => {
       if (!user) {
         return res.status(404).json({ error: 'User not found' });
       }
 
       return user.destroy() .then(result => {
         //console.log('Deleted user:', result);
         res.status(200).json({ message: 'User deleted successfully' });
       });
     })
     .catch(err => {
       console.error('Error deleting user:', err);
       res.status(500).json({ error: 'Failed to delete user' });
     });
 };
  
 exports.editExpense = (req, res, next) => {
   const expenseId = req.body.expenseId;
   const updatedAmount= req.body.Amount;
   const updateddes = req.body.des;
   const updatedcategory= req.body.category;

   UserModel.findByPk(expenseId)
     .then(user => {
       if (!user) {
         return res.status(404).json({ error: 'User not found' });
       }
 
       user.Amount = updatedAmount;
       user.des = updateddes;
       user.category = updatedcategory;
 
       return user.save();
     })
     .then(result => {
      // console.log('Updated user:', result);
       res.status(200).json(result); // customize the response as needed
     })
     .catch(err => {
      // console.error('Error updating user:', err);
       res.status(500).json({ error: 'Failed to update user' });
     });
 };
 

 



