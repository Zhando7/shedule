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
            msg: 'Data is saved!'
        });
    });
}

exports.getMonth = (req, res) => {
    const id = req.params.id;
    
    Shedule.Month.findById(id, (err, doc) => {
        if(err) {
            return res.status(400).json({
                msg: 'The request parameter is not found'
            });
        }
        Shedule.Day.find({ id_month: id }, (err, docs) => {
            if(err) {
                return res.status(400).json({
                    msg: 'The id_month is not found'
                })
            }
            return res.status(200).json({
                msg: 'The id_month have found',
                docs: docs
            });
        })
    });
}

exports.updateMonth = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });;

    const id = req.body.id;
    const number = req.body.number;
    const title = req.body.title;
    const year = req.body.year;

    Shedule.Month.updateOne({ id: id }, (err, doc) => {
        if(err) {
            return res.status(400).json({
                msg: 'Data do not update'
            });
        }
        console.log(doc);
        doc.month.number = number;
        doc.month.title = title;
        doc.year = year;
        doc.save((err) => {
            if(err) {
                return res.status(400).json({
                    msg: 'Document do not save'
                });
            }
            res.status(200).json({
                msg: 'Data is updated',
                doc: doc
            })
        });
    });
}

exports.deleteMonth = (req, res) => {

}

exports.selectMonth = (req, res) => {

}