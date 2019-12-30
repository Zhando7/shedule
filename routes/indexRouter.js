const express = require('express');
const indexController = require('../controllers/indexController');
const indexRouter = express.Router();

indexRouter.use('/', indexController.getIndex);

module.exports = indexRouter;