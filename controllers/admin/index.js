const   year = require('./year'),
        month = require('./month'),
        date = require('./date'),
        lesson = require('./lesson'),
        Shedule = require('../../models/shedule'),
        server = require('../../utils/server');

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
            server.sendError(err, res, 'Year not found');
        }
    }
}