const ExpenseModel = require('../models/expense'); // Assuming you have a UserModel defined in models/user.js
// Controller function to insert a new user
exports.insertExpense =  (req, res,next) => {
  const Amount =req.body.Amount;
  const des =req.body.des;
  const category = req.body.category;
      // Use UserModel.create function to insert the user into the database
 ExpenseModel.create({
      Amount : Amount,
      des: des,
    category: category,
    })
    .then(result => {
      console.log("user Data collected")
      res.status(201).json(result);
    
    })
    .catch (error => {  console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Failed to insert user'})
  })
}


exports.getAllExpense = (req, res, next) => {
  ExpenseModel.findAll()
    .then(expense => {
      //console.log("Retrieved all users:", users);
      res.status(200).json(expense);
    })
    .catch(error => {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    });
};
