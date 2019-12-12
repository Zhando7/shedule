const express = require('express');

const homeController = require('../controllers/homeController');
const homeRouter = express.Router();

homeRouter.get('/', homeController.getIndex);

module.exports = homeRouter;