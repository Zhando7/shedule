const mongoose = require('mongoose');
const conf = require('./config');

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);

        mongoose.connection
        .on('error', err => reject(err))
        .on('close', () => console.log('Mongoose closed connection!'))
        .on('open', () => resolve(mongoose.connections[0]));

        mongoose.connect(conf.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    });
}