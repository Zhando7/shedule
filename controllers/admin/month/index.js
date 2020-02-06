const   Shedule = require('../../../models/shedule'),
        admin = require('../../../utils/admin');

exports.createMonth = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const   { id_year, month } = req.body,
                newMonth = new Shedule.Month({ id_year, month }),
                docs = await newMonth.save();

        admin.sendResult(res, docs);
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.getMonth = async (req, res) => {
    try {
        const id = req.params.id;
        const docs = await Shedule.Month.find({ id_year: id });

        res.render('month', { docs, id });
    } catch (err) {
        admin.sendError(err, res, 'Documents cannot find');
    }
}

exports.updateMonth = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });

    const id = req.body.id;
    const number = req.body.number;
    const title = req.body.title;

    Shedule.Month.updateOne({ _id: id }, {
        month: {
            number: number,
            title: title
        }
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