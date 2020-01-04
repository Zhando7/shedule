const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authentication');

authRouter.get('/', authController.getIndex);

module.exports = authRouter;