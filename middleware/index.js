module.exports = (app, express) => {
    const   path = require('path'),
            conf = require('../config'),

            bodyParser = require('body-parser'),
            staticAsset = require('static-asset'),
            
            mongoose = require('../utils/mongoose'),
            session = require('express-session'),
            MongoStore = require('connect-mongo')(session),

            authRouter = require('../routes/authentication'),
            monthRouter = require('../routes/month'),
            indexRouter = require('../routes');

    /*
    * Page rendering
    */
    app.set('view engine', 'ejs');
    
    /*
    * Requests parser
    */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /* 
    * `staticAsset` используем для создания опечатков 
    * в URL закэшированных статических файлов 
    */
    app.use(staticAsset(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public')));

    /*
    * Session
    */
    app.use(session({
        secret: conf.session.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: conf.session.cookie,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    /*
    * Routing
    */
    app.use('/login', authRouter);
    app.use('/month', monthRouter);
    app.use('/', indexRouter);

    /*
    * Error handlers
    */
    app.use(function(req, res, next) {
        res.status(404);
        res.render('error', { error: 'Not found' });
        return;
    });
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', { error: err.message });
        return;
    });
}