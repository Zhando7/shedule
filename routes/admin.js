const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin');

// Create month, date, lesson
adminRouter.post('/year', adminController.year.createYear);
adminRouter.post('/month', adminController.month.createMonth);
adminRouter.post('/date', adminController.date.createDate);
adminRouter.post('/lessons', adminController.lesson.createLesson);

// Read index, month, date, lessons
adminRouter.get('/', adminController.getIndex);
adminRouter.get('/month/:id', adminController.month.getMonth);
adminRouter.get('/date/:id', adminController.date.getDate);

// Update month, date, lesson
adminRouter.put('/year', adminController.year.updateYear);
adminRouter.put('/month', adminController.month.updateMonth);
adminRouter.put('/date', adminController.date.updateDate);
adminRouter.put('/lessons', adminController.lesson.updateLesson);

// Delete month, date, lesson
adminRouter.delete('/year/:id', adminController.year.deleteYear);
adminRouter.delete('/month/:id', adminController.month.deleteMonth);
adminRouter.delete('/date/:id', adminController.date.deleteDate);
adminRouter.delete('/lessons/:id', adminController.lesson.deleteLesson);

// Select month, date, lesson
adminRouter.get('/year/select/:id', adminController.year.selectYear);
adminRouter.get('/month/select/:id', adminController.month.selectMonth);
adminRouter.get('/date/select/:id', adminController.date.selectDate);
adminRouter.get('/lessons/select/:id', adminController.lesson.selectLesson);

module.exports = adminRouter;