const express = require('express');

const resetpasswordController = require('../controller/resetpassword');
//const Forgotpassword = require('../models/forgotpassword');

const Forgot_password = require('../controller/Forgot_Pwd')

const router = express.Router();

router.get('/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)

router.get('/resetpassword/:id', resetpasswordController.resetpassword)

router.use('/forgotpassword', Forgot_password.forget_password_send_email)

module.exports = router;
