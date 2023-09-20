 
const path = require('path');

const express = require('express');

const router = express.Router();

const  dashboard = require('../controller/dashboard')

const authenticated = require('../middleware/authMiddleware')
 
router.get('/dashboard', authenticated, dashboard);

// router.get('/dashboard', (req,res,next)=>{
//    console.log(req)
// });
 


module.exports = router