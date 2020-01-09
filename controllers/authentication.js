const User = require('../models/user');

exports.getIndex = (req, res) => {
    res.render('login');
}

exports.signIn = (req, res) => {
    User.findOne({ 'name': req.body.name }, (err, doc) => {
        if(doc === null) {
            return res.status(400).send({
                message: 'User not found'
            });
        }
        else {
            if(doc.validPassword(req.body.password)) {
                req.session.userId = doc._id;
                req.session.userLogin = doc.name;

                return res.status(201).send({
                    message: 'User Logged In'
                });
            }
            else {
                return res.status(400).send({
                    message: 'Wrong password'
                });
            }
        }
    });
    // res.redirect('/');
}

exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.status(401).send({
            message: 'Cannot access session'
        });
    });
    res.redirect('/');
}