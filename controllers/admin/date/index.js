const   Shedule = require('../../../models/shedule'),
        server = require('../../../utils/server'),
        calendar = require('../../../utils/calendar');

exports.getDates = async (req, res) => {
    try {
        let id_month = req.params.id,
            lessons = await Shedule.nDate.find({ id_month }).sort({ full_date: 1}),
            docs = calendar.createCalendar(lessons);

        server.sendResult(res, docs, 'The dates of the selected month is found');
    } catch (err) {
        server.sendError(err, res);
    }
}