const   Shedule = require('../../../models/shedule'),
        admin = require('../../../utils/admin');

exports.createYear = async (req, res) => {
    try {
        admin.checkReqBody(req, res);
        
        const   year = req.body.year,
                newYear = new Shedule.Year({ year }),
                docs = await newYear.save();
                
        admin.sendResult(res, docs);
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.updateYear = async (req, res) => {
    try {
        admin.checkReqBody(req, res);

        const { _id, year } = req.body;
        const docs = await Shedule.Year.updateOne({ _id }, { year });

        admin.sendResult(res, docs, `The year is updated!`);
    } catch (err) {
        admin.sendError(err, res, 'The year cannot update');
    }
}

exports.deleteYear = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.Year.deleteOne({ _id });

        admin.sendResult(res, docs, 'The year is deleted!');
    } catch (err) {
        admin.sendError(err, res, 'The year cannot find!');
    }
}

exports.selectYear = async (req, res) => {
    try {
        const   _id = req.params.id,
                docs = await Shedule.Year.findById({ _id });

                admin.sendResult(res, docs, 'The year is founded!');
    } catch (err) {
        admin.sendError(err, res, 'The year cannot find!');
    }
}