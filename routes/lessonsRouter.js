const express = require('express');
const lessonsRouter = express.Router();
const lessonsController = require('../controllers/lessonsController');

lessonsRouter.use('/', lessonsController.getLessons);

module.exports = lessonsRouter;