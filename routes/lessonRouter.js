const express = require('express');
const lessonsRouter = express.Router();
const lessonController = require('../controllers/lessonController');

lessonsRouter.post('/post', lessonController.postLesson);
lessonsRouter.get('/:id', lessonController.getLessons);

module.exports = lessonsRouter;