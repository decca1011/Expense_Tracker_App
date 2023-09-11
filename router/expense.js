 
const path = require('path');

const express = require('express');

const router = express.Router();

const userExpense = require('../controller/expense');

const editController = require('../controller/edit');

const authenticated = require('../middleware/authMiddleware')

// POST request to insert a new user
router.post('/', authenticated, userExpense.insertExpense);
// router.post('/', (req,res,next) => {
// console.log(req.body)
// console.log(req.headers.authorization)
// });

// GET request to retrieve all users
router.get('/', authenticated, userExpense.getAllExpense);

router.delete('/:expenseId', editController.deleteExpense);
 
router.post('/edit',  editController.editExpense);

module.exports = router;


