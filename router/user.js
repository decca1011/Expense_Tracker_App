const  path = require('path');

const express = require('express');

const controller = require('../controller/user')

const  router = express.Router();

router.post('/Data',controller.add_User)
router.get('/Data',controller.get_User)

module.exports = router;

