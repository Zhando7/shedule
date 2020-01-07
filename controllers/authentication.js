const User = require('../models/user');

exports.getIndex = (req, res) => {
    res.render('login');
}

exports.createAdmin = (req, res) => {
    let admin = new User();

    admin.name = 'root_2';
    admin.setPassword('root_2');

    admin.save((err, doc) => {
        if(err) {
            return res.status(400).send({
                message: 'Failed to add user'
            });
        }
        else {
            return res.status(201).send({
                message: 'Admin added successfully'
            });
        }
    });
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
                req.session.login = doc.name;

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