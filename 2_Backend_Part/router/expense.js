 
const path = require('path');

const express = require('express');

const router = express.Router();

const userExpense = require('../controller/expense');

const editController = require('../controller/edit');

const authenticated = require('../middleware/authMiddleware')

// POST request to insert a new user
router.post('/', authenticated, userExpense.insertExpense);
 
// GET request to retrieve all users
router.get('/' , authenticated,userExpense.getAllExpense);

router.delete('/:expenseId', editController.deleteExpense);
 
router.post('/edit',  editController.editExpense);
 
router.get('/download' , authenticated ,userExpense.downloadExpense)
router.get('/downloadlink' , authenticated ,userExpense.getdownloadExpense)
// router.get('/download' ,  authenticated ,(req,res) => {
//    console.log( req.user)
// })

module.exports = router;


