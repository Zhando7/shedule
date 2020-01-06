const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

// Create admin on default
userRouter.post('/addAdmin', userController.createAdmin);

// Get index page
userRouter.get('/', userController.getIndex);

// Sign in function
userRouter.post('/', userController.signIn);

module.exports = userRouter;