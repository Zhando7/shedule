const express = require('express'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    app = express(),
    conf = require('./config'),
    middleware = require('./middleware')(app, express);

/*
 * Подключение к БД
 * Start point
 */
mongoose.Promise = global.Promise;
mongoose.set('debug', ( conf.IS_PRODUCTION == 'prod' ) ? false : true );

mongoose.connect(conf.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .on('error', err => console.log(err))
    .on('close', () => console.log('Database connection closed!'))
    .on('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${conf.PORT}/${info.name}`);
    });
// End point

/*
 * Session
 * Start point
 */
app.use(session({
    secret: conf.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// End point

app.listen(conf.PORT, () => {
    console.log(`Web app listening on port:${conf.PORT}`)
});