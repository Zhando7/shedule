const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authentication');

// logout 
authRouter.get('/logout', authController.logOut);

// login
authRouter.post('/login', authController.logIn);

// Get index page
authRouter.get('/login', authController.getIndex);

module.exports = authRouter;