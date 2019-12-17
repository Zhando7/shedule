const express = require('express');
const mongoose = require('mongoose');
const lessonsRouter = express.Router();
const lessonsController = require('../controllers/lessonsController');

lessonsRouter.use('/post', lessonsController.postLesson);
lessonsRouter.use('/', lessonsController.getLessons);

module.exports = lessonsRouter;