const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authentication');

// Get index page 
authRouter.get('/logout', authController.logOut);
authRouter.get('/login', authController.getIndex);

// Post data
authRouter.post('/login', authController.logIn);


module.exports = authRouter;