const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authentication');

// Get index page
authRouter.get('/', authController.getIndex);

// sign in function
authRouter.post('/', authController.signIn);

// creating admin on default
authRouter.get('/create', authController.createAdmin);

module.exports = authRouter;