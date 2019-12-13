const express = require('express');
const mongoose = require('mongoose');
const lessonsRouter = express.Router();
const lessonsController = require('../controllers/lessonsController');
const db = require('../models/shedule');

lessonsRouter.use('/post', (req, res) => {
    // db.Group.create({
    //     _id: new mongoose.Types.ObjectId(),
    //     title: 'Название урока'
    // }, 
    // (err, doc) => {
    //     if(err) return console.log(err);

    //     console.log(doc);
    // });
});

lessonsRouter.use('/', lessonsController.getLessons);

module.exports = lessonsRouter;