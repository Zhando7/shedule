const User = require('../models/user');

exports.getIndex = (req, res) => {
    // create a user document
    const admin = new User({
        name: 'root',
        password: 'root12345678'
    });

    admin.save((err) => {
        if( err ) return console.log(err);
        res.send(admin);
    });
}