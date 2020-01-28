const User = require('../models/user');

exports.getIndex = (req, res) => {
    res.render('login');
}

exports.logIn = (req, res) => {
    User.findOne({ 'name': req.body.name }, (err, doc) => {
        if(doc === null) {
            return res.status(200).json({
                msg: 'User not found'
            });
        }
        else {
            if(doc.validPassword(req.body.password)) {
                req.session.userId = doc._id;
                req.session.userLogin = doc.name;

                return res.status(200).json({
                    msg: 'User Logged In'
                });
            }
            else {
                return res.status(400).json({
                    msg: 'Wrong password'
                });
            }
        }
    });
    // res.redirect('/');
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