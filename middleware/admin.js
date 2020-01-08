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