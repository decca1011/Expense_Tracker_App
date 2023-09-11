const  path = require('path');

const express = require('express');

const controller = require('../controller/user')

const  router = express.Router();

const authMiddleware = require('../middleware/authMiddleware'); // Import your authMiddleware
 
router.post('/Data',controller.add_User)
//router.post('/signin',authMiddleware, controller.get_User)
// router.get('/Data',controller.get_User)
router.post('/signin', controller.get_User)

module.exports = router;

