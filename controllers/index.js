const   User = require('../models/user'),
        Shedule = require('../models/shedule'),
        admin = require('../utils/admin');

exports.getIndex = async (req, res) => {
    try {
        var checkAdmin,
            year = new Date().getFullYear(),
            currentYear = await Shedule.Year.findOne({ year }),
            docs = await Shedule.Month.find({ id_year: currentYear });

        req.session.userId ? checkAdmin = true : checkAdmin = false;
        
        res.render('index', { checkAdmin, docs });
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.logIn = (req, res) => {
    User.findOne({ 'name': req.body.name }, (err, doc) => {
        if(doc === null) {
            return res.status(400).json({
                msg: 'Пользователь с таким именем не найден'
            });
        }
        else {
            if(doc.validPassword(req.body.password)) {
                req.session.userId = doc._id;
                req.session.userLogin = doc.name;

                return res.status(200).json({
                    msg: 'Ok'
                });
            }
            else {
                return res.status(400).json({
                    msg: 'Неправильный пароль'
                });
            }
        }
    });
}

exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return res.status(400).json({
                msg: 'Cannot access session'
            });
        }
        res.redirect('/');
    });
}

exports.getDates = async (req, res) => {
    try {
        admin.checkReqBody(req, res);
        
        const   id_month = req.params.id,
                docs = await Shedule.nDate.find({ id_month });
                
        admin.sendResult(res, docs, 'Dates of the selected month is found');
    } catch (err) {
        admin.sendError(err, res);
    }
}

exports.getLessons = async (req, res) => {
    try {
        const   id_date = req.params.id,
                docs = await Shedule.Lesson.find({ id_date });
        
        admin.sendResult(res, docs, 'Lessons of the selected date is found');
    } catch (err) {
        admin.sendError(err, res);
    }
}