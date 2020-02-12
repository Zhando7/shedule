const express = require('express');
const indexRouter = express.Router();
const indexController = require('../controllers');

indexRouter.get('/', indexController.getIndex);

indexRouter.post('/login', indexController.logIn);
indexRouter.get('/logout', indexController.logOut);

indexRouter.get('/view/dates/:id', indexController.getDates);
indexRouter.get('/view/lessons/:id', indexController.getLessons);

module.exports = indexRouter;