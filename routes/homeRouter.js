const express = require('express');
const homeController = require('../controllers/homeController');
const homeRouter = express.Router();

homeRouter.use('/', homeController.getIndex);

module.exports = homeRouter;