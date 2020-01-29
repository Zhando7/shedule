const   User = require('../models/user'),
        conf = require('../config');

exports.createAdmin = () => {
    let admin = new User();

    admin.name = conf.admin.name;
    admin.setPassword(conf.admin.password);

    admin.save((err, doc) => {
        if(err) {
            console.log(`${err}`);
        }
        else {
            console.log(`Admin is created`);
        }
    });
}

exports.checkReqBody = (req, res) => {
    if(!req.body) return res.status(400).json({
        msg: 'The request body is null'
    });
}

exports.sendResult = (res, docs, msg = 'Document is saved') => {
    res.status(200).json({
        msg: msg,
        docs: docs
    })
}

exports.sendError = (err, res, msg = 'The data cannot save') => {
    res.status(400).render('error', { message: msg });
}