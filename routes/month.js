const express = require('express');
const monthRouter = express.Router();
const monthController = require('../controllers/month');

// Get the selected month
monthRouter.get('/:id', monthController.getMonthById);

module.exports = monthRouter;