const Shedule = require('../../../models/shedule');

exports.createLesson = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });;

    const id_day = req.body.id_day;
    const time_start = {
        hour: req.body.time_start.hour,
        minutes: req.body.time_start.minutes
    };
    const time_end = {
        hour: req.body.time_end.hour,
        minutes: req.body.time_end.minutes
    };
    const title = req.body.title;
    const desc = req.body.desc;

    const lesson = new Shedule.Lesson({
        id_day: id_day,
        time_start: {
            hour: time_start.hour,
            minutes: time_start.minutes
        },
        time_end: {
            hour: time_end.hour,
            minutes: time_end.minutes
        },
        title: title,
        desc: desc
    });

    lesson.save((err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Cannot save data'
            });
        }
        return res.status(200).json({
            msg: 'Document saved!'
        });
    });
}

exports.updateLesson = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });;

    const id = req.body.id;
    const id_day = req.body.id_day;
    const time_start = {
        hour: req.body.time_start.hour,
        minutes: req.body.time_start.minutes
    };
    const time_end = {
        hour: req.body.time_end.hour,
        minutes: req.body.time_end.minutes
    };
    const title = req.body.title;
    const desc = req.body.desc;

    Shedule.Lesson.updateOne({ _id: id }, {
        id_day: id_day,
        time_start: {
            hour: time_start.hour,
            minutes: time_start.minutes
        },
        time_end: {
            hour: time_end.hour,
            minutes: time_end.minutes
        },
        title: title,
        desc: desc
    }, (err, doc) => {
        if(err) {
            return res.status(400).json({
                msg: 'Document do not update'
            });
        }
        return res.status(200).json({
            msg: 'Document saved',
            doc: doc
        });
    });
}

exports.deleteLesson = (req, res) => {
    const id = req.params.id;

    Shedule.Lesson.deleteOne({ _id: id }, (err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Document not found'
            });
        }
        return res.status(200).json({
            msg: 'Document deleted'
        });
    });
}

exports.selectLesson = (req, res) => {
    const id = req.params.id;

    Shedule.Lesson.findById(id, (err, doc) => {
        if(err) {
            return res.status(400).json({
                msg: 'Document not found'
            });
        }
        return res.status(200).json({
            msg: 'Document found',
            doc: doc
        });
    });
}