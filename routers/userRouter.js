const express = require('express');
const uController = require('../Controllers/userController');

const uRouter = express.Router();

uRouter.all('/signup', uController.signUpFunc);
uRouter.all('/login', uController.logInFunc);
uRouter.get('/logout', uController.logOutFunc);

module.exports = uRouter;