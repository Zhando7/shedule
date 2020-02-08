const   Shedule = require('../../../models/shedule'),
        admin = require('../../../utils/admin');

exports.createDay = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const   { id_month, full_date } = req.body,
                createNewDay = new Shedule.Day({ id_month, full_date }),
                docs = await createNewDay.save();

        admin.sendResult(res, docs);
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.getDay = async (req, res) => {
    try {
        const   id_month = req.params.id,
                docs = await Shedule.Day.find({ id_month });

        res.render('day', { id_month, docs })
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.updateDay = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const   { _id, full_date } = req.body,
                docs = await Shedule.Day.updateOne({ _id }, { full_date });

        admin.sendResult(res, docs, 'The selected day has updated');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.deleteDay = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.Day.deleteOne({ _id });

        admin.sendResult(res, docs, 'The selected day has deleted');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.selectDay = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.Day.findById({ _id });

        admin.sendResult(res, docs, 'The selected day is found');
    } catch (err) {
        admin.sendError(err, res);
    }
}