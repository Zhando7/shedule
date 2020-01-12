const   month = require('./month'),
        day = require('./day'),
        lesson = require('./lesson');

module.exports = {
    month: month,
    day: day,
    lesson: lesson,
    getIndex: (req, res) => {
        res.status(200).send('This is admin page!');
    }
}