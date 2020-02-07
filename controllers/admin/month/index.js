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
        const   id_year = req.params.id,
                docs = await Shedule.Month.find({ id_year });

        res.render('month', { docs, id_year });
    } catch (err) {
        admin.sendError(err, res, 'Documents cannot find');
    }
}

exports.updateMonth = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const   { _id, month } = req.body,
                docs = await Shedule.Month.updateOne({ _id }, { month });
        
        admin.sendResult(res, docs, `The month is updated!`);
    } catch (err) {
        admin.sendError(err, res, 'The month cannot update');
    }
}

exports.deleteMonth = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.Month.deleteOne({ _id });
        
        admin.sendResult(res, docs, 'The month is deleted!');
    } catch (err) {
        admin.sendError(err, res, 'The year cannot find!');
    }
}

exports.selectMonth = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.Month.findById(_id);

        admin.sendResult(res, docs, 'The month is founded!');
    } catch (err) {
        admin.sendError(err, res, 'The month cannot find!');
    }
}