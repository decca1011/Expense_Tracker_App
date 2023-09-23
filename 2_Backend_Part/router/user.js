const  path = require('path');

const express = require('express');

const controller = require('../controller/user')

const  router = express.Router();
 
router.post('/Data',controller.add_User)
 
router.post('/signin',  controller.get_User)

router.post('/password/forgotpassword', (req,res,next) => {
   console.log(req.body)
   res.json('sucess')
})

module.exports = router;

