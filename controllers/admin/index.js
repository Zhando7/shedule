const   year = require('./year'),
        month = require('./month'),
        day = require('./day'),
        lesson = require('./lesson'),
        Shedule = require('../../models/shedule'),
        admin = require('../../utils/admin');

module.exports = {
    year: year,
    month: month,
    day: day,
    lesson: lesson,
    getIndex: async (req, res) => {
        try {
            const docs = await Shedule.Year.find({});
            res.render('admin', { docs });
        } catch (err) {
            admin.sendError(err, res, 'Years not found');
        }
    }
}