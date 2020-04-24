const   User = require('../models/user'),
        Shedule = require('../models/shedule'),
        server = require('../utils/server');

exports.getIndex = async (req, res) => {
    try {
        let checkAdmin = req.session.userId ? true : false,
            year = new Date().getFullYear(),
            currentYear = await Shedule.Year.findOne({ year }),
            docs = await Shedule.Month.find({ id_year: currentYear });
                
        res.render('index', { checkAdmin, docs });
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.logIn = (req, res) => {
    let name = req.body.name;
    
    User.findOne({ name }, (err, doc) => {
        if(err) throw err;
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
                return res.status(401).json({
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
        let id_month = req.params.id,
            docs = await Shedule.nDate.find({ id_month }).sort({ full_date: 1});
                
        server.sendResult(res, docs, 'Dates of the selected month is found');
    } catch (err) {
        server.sendError(err, res);
    }
}

exports.getLessons = async (req, res) => {
    try {
        let id_date = req.params.id,
            docs = await Shedule.Lesson.find({ id_date });
        
        server.sendResult(res, docs, 'Lessons of the selected date is found');
    } catch (err) {
        server.sendError(err, res);
    }
}