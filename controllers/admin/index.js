const   year = require('./year'),
        month = require('./month'),
        date = require('./date'),
        lesson = require('./lesson'),
        Shedule = require('../../models/shedule'),
        admin = require('../../utils/admin');

module.exports = {
    year: year,
    month: month,
    date: date,
    lesson: lesson,
    getIndex: async (req, res) => {
        try {
            let docs = await Shedule.Year.find({});
            
            res.render('admin', { docs });
        } catch (err) {
            admin.sendError(err, res, 'Years not found');
        }
    }
}