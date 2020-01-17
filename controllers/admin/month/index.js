const Shedule = require('../../../models/shedule');

exports.createMonth = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });;

    const number = req.body.number;
    const title = req.body.title;
    const year = req.body.year;

    const month = new Shedule.Month({
        month: {
            number: number,
            title: title
        },
        year: year
    });

    month.save((err) => {
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

exports.getMonth = (req, res) => {
    const id = req.params.id;
    
    Shedule.Month.findById(id, (err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Document not found'
            });
        }
        Shedule.Day.find({ id_month: id }, (err, docs) => {
            if(err) {
                return res.status(400).json({
                    msg: 'The id_month is not found'
                })
            }
            return res.status(200).json({
                msg: 'Document founded',
                docs: docs
            });
        })
    });
}

exports.updateMonth = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });
    const id = req.body.id;
    const number = req.body.number;
    const title = req.body.title;
    const year = req.body.year;

    Shedule.Month.updateOne({ _id: id }, {
        month: {
            number: number,
            title: title
        },
        year: year
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

exports.deleteMonth = (req, res) => {
    const id = req.params.id;

    Shedule.Month.deleteOne({ _id: id }, (err) => {
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

exports.selectMonth = (req, res) => {
    const id = req.params.id;

    Shedule.Month.findById(id, (err, doc) => {
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