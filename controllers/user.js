const User = require('../models/user');

exports.postLogin = (req, res) => {
    User.findOne({ 'name': req.body.name }, (err, doc) => {
        if(doc === null) {
            return res.status(400).send({
                message: 'User not found'
            });
        }
        else {
            if(doc.validPassword(req.body.password)) {
                req.session.userId = admin._id;
                req.session.login = admin.name;
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
}

exports.postSignup = (req, res, next) => {
    let admin = new User();

    admin.name = req.body.name;
    admin.setPassword(req.body.password);

    admin.save((err, doc) => {
        if(err) {
            return res.status(400).send({
                message: 'Failed to add user'
            });
        }
        else {
            req.session.userId = admin._id;
            req.session.login = admin.name;
            return res.status(201).send({
                message: 'Admin added successfully'
            });
        }
    });
}