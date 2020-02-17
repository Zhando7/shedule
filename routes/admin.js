const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin');

// Create month, lesson
adminRouter.post('/year', adminController.year.createYear);
adminRouter.post('/month', adminController.month.createMonth);
adminRouter.post('/lesson', adminController.lesson.createLesson);

// Read index, month, date, lessons
adminRouter.get('/', adminController.getIndex);
adminRouter.get('/month/:id', adminController.month.getMonth);
adminRouter.get('/dates/:id', adminController.date.getDates);
adminRouter.get('/lesson/:id', adminController.lesson.getLesson);

// Update month, lesson
adminRouter.put('/year', adminController.year.updateYear);
adminRouter.put('/month', adminController.month.updateMonth);
adminRouter.put('/lesson', adminController.lesson.updateLesson);

// Delete month, lesson
adminRouter.delete('/year/:id', adminController.year.deleteYear);
adminRouter.delete('/month/:id', adminController.month.deleteMonth);
adminRouter.delete('/lesson/:id', adminController.lesson.deleteLesson);

// Select month, lesson
adminRouter.get('/year/select/:id', adminController.year.selectYear);
adminRouter.get('/month/select/:id', adminController.month.selectMonth);
adminRouter.get('/lesson/select/:id', adminController.lesson.selectLesson);

module.exports = adminRouter;