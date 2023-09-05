 
const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controller/expense');

const editController = require('../controller/edit');



// POST request to insert a new user
router.post('/', userController.insertExpense);

// GET request to retrieve all users
router.get('/', userController.getAllExpense);

router.delete('/:expenseId', editController.deleteExpense);
 
router.post('/edit',  editController.editExpense);
  
  
module.exports = router;
