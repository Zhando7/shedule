const Shedule = require('../../../models/shedule');

exports.createDay = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });;

    const id_month = req.body.id_month;
    const number = req.body.number;
    const weekday = req.body.weekday;

    const day = new Shedule.Day({
        id_month: id_month,
        number: number,
        weekday: weekday
    });

    day.save((err) => {
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

exports.getDay = (req, res) => {
    const id = req.params.id;
    
    Shedule.Day.findById(id, (err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Document not found'
            });
        }
        Shedule.Lesson.find({ id_day: id }, (err, docs) => {
            if(err) {
                return res.status(400).json({
                    msg: 'The id_day is not found'
                })
            }
            return res.status(200).json({
                msg: 'Document founded',
                docs: docs
            });
        })
    });
}

exports.updateDay = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });

    const id = req.body.id;
    const id_month = req.body.id_month;
    const number = req.body.number;
    const weekday = req.body.weekday;

    Shedule.Day.updateOne({ _id: id }, {
        id_month: id_month,
        number: number,
        weekday: weekday
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

exports.deleteDay = (req, res) => {
    const id = req.params.id;

    Shedule.Day.deleteOne({ _id: id }, (err) => {
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

exports.selectDay = (req, res) => {
    const id = req.params.id;

    Shedule.Day.findById(id, (err, doc) => {
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