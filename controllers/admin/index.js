const   year = require('./year'),
        month = require('./month'),
        day = require('./day'),
        lesson = require('./lesson');

module.exports = {
    year: year,
    month: month,
    day: day,
    lesson: lesson,
    getIndex: (req, res) => {
        res.render('admin');
    }
}