const express = require('express');
const router = express.Router();

const resetpasswordController = require('../controller/resetpassword');
const Forgotpassword = require('../models/forgotpassword');



const Forgot_password = require('../controller/Forgot_Pwd')
 router.use('/forgotpassword', Forgot_password.forget_password_send_email)
// router.get('/resetpassword/:id', Forgot_password.reset_password_by_id)

router.get('/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)

router.get('/resetpassword/:id', resetpasswordController.resetpassword)

//router.use('/forgotpassword', resetpasswordController.forgotpassword)

module.exports = router;
