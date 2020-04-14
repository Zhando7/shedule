const   Shedule = require('../../../models/shedule'),
        server = require('../../../utils/server'),
        calendar = require('../../../utils/calendar');

exports.createMonth = async (req, res) => {
    try {
        server.checkReqBody(req, res);

        let { id_year, month } = req.body,
            newMonth = new Shedule.Month({ id_year, month }),
            docs = await newMonth.save(),
            y = await Shedule.Year.findById(id_year),
            obj = {
                year: y.year,
                month: month.number,
                id_month: docs._id
            },
            dates = calendar.createDatesOfMonth(obj);
        
        await Shedule.nDate.insertMany(dates);
        
        server.sendResult(res, docs);
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.getMonth = async (req, res) => {
    try {
        let id_year = req.params.id,
            docs = await Shedule.Month.find({ id_year });

        res.render('month', { id_year, docs });
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.updateMonth = async (req, res) => {
    try {
        server.checkReqBody(req, res);

        let { _id, month } = req.body,
            docs = await Shedule.Month.updateOne({ _id }, { month });
        
        server.sendResult(res, docs, `The selected month has updated`);
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.deleteMonth = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Month.deleteOne({ _id }),
            docsDates = await Shedule.nDate.find({ id_month: _id });

        docsDates.forEach( async el => {
            await Shedule.Lesson.deleteMany({ id_date: el._id });
        })
        
        await Shedule.nDate.deleteMany({ id_month: _id });
        
        server.sendResult(res, docs, 'The selected month has deleted');
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.selectMonth = async (req, res) => {
    try {
        let _id = req.params.id,
            docs = await Shedule.Month.findById(_id);

        server.sendResult(res, docs, 'The selected month is found');
    } catch (err) {
        server.sendError(err, res);
    }
}