const express = require('express');
const router = express.Router();
const userController = require('./user.controller.js');


router.post('/',userController.addUser);

router.post('/login',userController.login);

module.exports = router;