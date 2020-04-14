const   Shedule = require('../../../models/shedule'),
        server = require('../../../utils/server');

exports.createYear = async (req, res) => {
    try {
        server.checkReqBody(req, res);
        
        let year = req.body.year,
            newYear = new Shedule.Year({ year }),
            docs = await newYear.save();
                
        server.sendResult(res, docs);
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.updateYear = async (req, res) => {
    try {
        server.checkReqBody(req, res);

        let { _id, year } = req.body,
            docs = await Shedule.Year.updateOne({ _id }, { year });

        server.sendResult(res, docs, `The selected year has updated`);
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.deleteYear = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Year.deleteOne({ _id });

        server.sendResult(res, docs, 'The selected year has deleted');
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.selectYear = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Year.findById({ _id });

        server.sendResult(res, docs, 'The selected year is found');
    } catch (err) {
        server.sendError(err, res);
    }
}