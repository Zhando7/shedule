const Shedule = require('../../../models/shedule');

exports.createYear = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });

    const newYear = req.body.year;

    const year = new Shedule.Year({
        year: newYear
    });

    year.save((err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Cannot save data'
            });
        }
        return res.status(200).json({
            msg: 'Document saved!'
        })
    })
}

exports.getYear = (req, res) => {
    const id = req.params.id;
    
    Shedule.Year.findById(id, (err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Document not found'
            })
        }
        Shedule.Month.find({ id_year: id }, (err, docs) => {
            if(err) {
                return res.status(400).json({
                    msg: 'The id_year is not found'
                })
            }
            return res.status(200).json({
                msg: 'Document founded',
                docs: docs
            });
        })
    })
}

exports.updateYear = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });

    const id = req.body.id;
    const newYear = req.body.year;

    Shedule.Year.updateOne({ _id: id }, {
        year: newYear
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
    })
}

exports.deleteYear = (req, res) => {
    const id = req.params.id;

    Shedule.Year.deleteOne({ _id: id }, (err) => {
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

exports.selectYear = (req, res) => {
    const id = req.params.id;

    Shedule.Year.findById(id, (err, doc) => {
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