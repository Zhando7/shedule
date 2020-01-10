const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authentication');

// sign out 
authRouter.use('/logout', authController.logOut);

// sign in
authRouter.post('/login', authController.logIn);

// Get index page
authRouter.get('/', authController.getIndex);

module.exports = authRouter;