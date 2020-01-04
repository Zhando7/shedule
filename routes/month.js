const express = require('express');
const monthRouter = express.Router();
const monthController = require('../controllers/month');

monthRouter.get('/:id', monthController.getMonthById);

module.exports = monthRouter;