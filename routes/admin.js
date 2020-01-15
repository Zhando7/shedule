const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin');

// Create month, day, lesson
adminRouter.post('/month', adminController.month.createMonth);
adminRouter.post('/day', adminController.day.createDay);
adminRouter.post('/lessons', adminController.lesson.createLesson);

// Read index, month, day, lessons
adminRouter.get('/', adminController.getIndex);
adminRouter.get('/month/:id', adminController.month.getMonth);
adminRouter.get('/day/:id', adminController.day.getDay);
adminRouter.get('/lessons/:id', adminController.lesson.getLesson);

// Update month, day, lesson
adminRouter.put('/month', adminController.month.updateMonth);
adminRouter.put('/day', adminController.day.updateDay);
adminRouter.put('/lessons', adminController.lesson.updateLesson);

// Delete month, day, lesson
adminRouter.delete('/month/:id', adminController.month.deleteMonth);
adminRouter.delete('/day/:id', adminController.day.deleteDay);
adminRouter.delete('/lessons/:id', adminController.lesson.deleteLesson);

// Select month, day, lesson
adminRouter.get('/month/select/:id', adminController.month.selectMonth);
adminRouter.get('/day/select/:id', adminController.day.selectDay);
adminRouter.get('/lessons/select/:id', adminController.lesson.selectLesson);

module.exports = adminRouter;