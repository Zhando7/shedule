const   Shedule = require('../../../models/shedule'),
        admin = require('../../../utils/admin');

exports.createLesson = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        let { id_date, time_start, time_end, title, desc } = req.body,
            newLesson = new Shedule.Lesson({ id_date, time_start, time_end, title, desc }),
            docs = await newLesson.save();

        admin.sendResult(res, docs);
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.getLesson = async (req, res) => {
    try {
        let id_date = req.params.id,
            month = await Shedule.nDate.findById(id_date),
            docs = await Shedule.Lesson.find({ id_date });

        res.render('lesson', { id_date, month, docs });
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.updateLesson = async (req, res) => {
try {
        admin.checkReqBody(req, res);

        let { _id, time_start, time_end, title, desc } = req.body,
            docs = await Shedule.Lesson.updateOne({ _id }, {
                time_start,
                time_end,
                title,
                desc
            });

        admin.sendResult(res, docs, 'The selected lesson has updated');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.deleteLesson = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Lesson.deleteOne({ _id });

        admin.sendResult(res, docs, 'The selected lesson has deleted');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.selectLesson = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Lesson.findById({ _id });

        admin.sendResult(res, docs, 'The selected lesson is found');
    } catch (err) {
        admin.sendError(err, res);
    }
}