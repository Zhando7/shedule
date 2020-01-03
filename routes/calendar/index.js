const express = require('express');
const calendarRouter = express.Router();
const calendarController = require('../../controllers/calendar');

calendarRouter.get('/', calendarController.getIndex);

module.exports = calendarRouter;