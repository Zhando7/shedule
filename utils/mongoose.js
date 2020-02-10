mongoose = require('mongoose'),
conf = require('../config'),
/*
 * Database connection
 */
mongoose.Promise = global.Promise;
mongoose.set('debug', ( conf.IS_PRODUCTION == 'prod' ) ? false : true );

mongoose.connect(`${conf.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection
    .on('error', err => console.log(err))
    .on('close', () => console.log('Database connection is closed!'))
    .on('open', () => {
        const info = mongoose.connections[0];
        console.log(`Mongoose is connected to ${info.host}:${conf.PORT}/${info.name}`);
    });

module.exports = mongoose;