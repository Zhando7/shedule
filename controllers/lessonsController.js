const Lessons = require('../models/lessons');

exports.getLessons = (req, res) => {
    const data = Lessons.getLessonsById(req.query.id);

    res.render('lessons', {
        data: data
    });
}
