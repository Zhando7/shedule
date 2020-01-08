const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authentication');

// sign in function
authRouter.post('/', authController.signIn);

// Get index page
authRouter.get('/', authController.getIndex);

module.exports = authRouter;