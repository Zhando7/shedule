const express = require('express');
const indexRouter = express.Router();
const indexController = require('../controllers');

// Get index page
indexRouter.get('/', indexController.getIndex);

module.exports = indexRouter;