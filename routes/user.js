const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');

// userRouter.get('/', userController.getIndex);
userRouter.post('/addAdmin', userController.postSignup);
userRouter.post('/', userController.postLogin);

module.exports = userRouter;