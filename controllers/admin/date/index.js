const   Shedule = require('../../../models/shedule'),
        admin = require('../../../utils/admin'),
        calendar = require('../../../utils/calendar');

exports.getDates = async (req, res) => {
    try {
        let id_month = req.params.id,
            lessons = await Shedule.nDate.find({ id_month }),
            docs = calendar.createCalendar(lessons);

        admin.sendResult(res, docs, 'The dates of the selected month is found');
    } catch (err) {
        admin.sendError(err, res);
    }
}