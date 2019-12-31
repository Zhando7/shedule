const moment = require('../config/moment-conf');
const Lessons = require('../models/lessons');

exports.getIndex = (req, res, next) => {
    const currentDate = {
        year: moment().year(),
        month: moment().month()
    }
    const data = Lessons.getLessons(currentDate.month, currentDate.year);

    res.render('index', {
        lessons: data
    });
}