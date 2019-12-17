const moment = require('../moment-conf');
const Lessons = require('../models/lessons');

exports.getIndex = (req ,res) => {
    const currentDate = {
        month: moment().format('M'),
        year: moment().format('Y')
    };
    const data = Lessons.getLessons(currentDate.month, currentDate.year);
    
    res.render('index', {
        lessons: data
    });
}