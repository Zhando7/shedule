const moment = require('../moment-conf');
const db = require('../models/shedule');
const Lessons = require('../models/lessons'); // Удалить

exports.getLessons = (req, res) => {
    const data = Lessons.getLessonsById(req.query.id);

    res.render('lessons', {
        data: data
    });
}

exports.postLesson = (req, res) => {
    db.Shedule.create({
        day: moment().format('D'),
        month: {
            number: moment().format('M'),
            title: moment().format('MMMM')
        },
        year: moment().format('YYYY'),
        total: 3,
    }, (err, doc) => {
        if(err) return console.log(err);

        console.log(`Сохраненный объект ${doc}`);
    });

    res.redirect('/');
}