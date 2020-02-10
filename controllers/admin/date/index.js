const   Shedule = require('../../../models/shedule'),
        admin = require('../../../utils/admin');

exports.createDate = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const   { id_month, full_date } = req.body,
                createNewDate = new Shedule.nDate({ id_month, full_date }),
                docs = await createNewDate.save();

        admin.sendResult(res, docs);
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.getDate = async (req, res) => {
    try {
        const   id_month = req.params.id,
                year = await Shedule.Month.findOne({ _id: id_month }),
                foundDates = await Shedule.nDate.find({ id_month }),
                docs = formatingDates.call(foundDates);
        
        res.render('date', { year, id_month, docs })
    } catch (err) {
        admin.sendError(err, res);
    }
}

function formatingDates() {
    return this.map(el => ({
        _id: el._id,
        id_month: el.id_month,
        full_date: new Date(el.full_date).getDate()
    }));
}

exports.updateDate = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const   { _id, full_date } = req.body,
                docs = await Shedule.nDate.updateOne({ _id }, { full_date });

        admin.sendResult(res, docs, 'The selected date has updated');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.deleteDate = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.nDate.deleteOne({ _id });

        admin.sendResult(res, docs, 'The selected date has deleted');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.selectDate = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.nDate.findById({ _id });

        admin.sendResult(res, docs, 'The selected date is found');
    } catch (err) {
        admin.sendError(err, res);
    }
}