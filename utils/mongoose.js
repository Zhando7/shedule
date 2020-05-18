mongoose = require('mongoose'),
conf = require('../config'),
/*
 * Database connection
 */
mongoose.set('debug', ( conf.IS_PRODUCTION === 'dev' ) ? true : false );

mongoose.connect(`${conf.MONGO_URL}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});

module.exports = mongoose;