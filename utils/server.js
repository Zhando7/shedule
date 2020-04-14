const   User = require('../models/user'),
        conf = require('../config');

exports.createAdmin = () => {
    var admin = new User();

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

exports.sendResult = (res, docs, msg = 'Document has successfully created') => {
    res.status(200).json({
        status: 200,
        msg: msg,
        docs: docs
    })
}

exports.sendError = (err, res, msg) => {
    res.status(err.status || 400).json({ 
        status: err.status || 400,
        msg: msg || err.message 
    });
}