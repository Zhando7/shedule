const   Shedule = require('../../../models/shedule'),
        server = require('../../../utils/server');

exports.createLesson = async (req, res) => {
    try {
        server.checkReqBody(req, res);

        let { id_date, time_start, time_end, title, desc } = req.body,
            newLesson = new Shedule.Lesson({ id_date, time_start, time_end, title, desc }),
            docs = await newLesson.save();

        server.sendResult(res, docs);
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.getLesson = async (req, res) => {
    try {
        let id_date = req.params.id,
            docs = await Shedule.Lesson.find({ id_date }),
            date = await Shedule.nDate.findById({ _id: id_date }),
            month = await Shedule.Month.findById({ _id: date.id_month });
            
        res.render('lesson', { id_date, month, docs });
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.updateLesson = async (req, res) => {
try {
        server.checkReqBody(req, res);

        let { _id, time_start, time_end, title, desc } = req.body,
            docs = await Shedule.Lesson.updateOne({ _id }, {
                time_start,
                time_end,
                title,
                desc
            });

        server.sendResult(res, docs, 'The selected lesson has updated');
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.deleteLesson = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Lesson.deleteOne({ _id });

        server.sendResult(res, docs, 'The selected lesson has deleted');
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.selectLesson = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Lesson.findById({ _id });

        server.sendResult(res, docs, 'The selected lesson is found');
    } catch (err) {
        server.sendError(err, res);
    }
}