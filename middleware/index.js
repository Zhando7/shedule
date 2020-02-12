module.exports = (app, express) => {
    const   path = require('path'),
            conf = require('../config'),

            bodyParser = require('body-parser'),
            staticAsset = require('static-asset'),
            
            mongoose = require('../utils/mongoose'),
            admin = require('../utils/admin'),
            session = require('express-session'),
            MongoStore = require('connect-mongo')(session),
            checkAuth = require('./checkAuth'),

            adminRouter = require('../routes/admin'),
            indexRouter = require('../routes');

    /*
    * Creating admin on default
    */
    admin.createAdmin();

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
    * Body limit is 10
    */
    app.use(express.json({ limit: '10kb' }));

    /* 
    * `staticAsset` используем для создания опечатков 
    * в URL закэшированных статических файлов 
    */
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(staticAsset(path.join(__dirname, '../public')));

    /*
    * Session
    */
    app.use(session({
        secret: conf.session.secret,
        resave: true,  //don't save session if unmodified
        saveUninitialized: false,   // A session that is "uninitialized" to be saved to the store
        cookie: conf.session.cookie,
        store: new MongoStore({ 
            mongooseConnection: mongoose.connection,
            ttl: 24 * 3600,
            autoRemove: 'native',
            touchAfter: 3600
        })
    }));

    /*
    * Routing
    */
    app.use('/admin', checkAuth, adminRouter);
    app.use('/', indexRouter);

    /*
    * Error handlers
    */
    app.use((req, res, next) => {
        next(new Error(404));
    });

    app.use((err, req, res, next) => {
        res.status( err.status || 500 );
        res.render('error', {
            message: err.message,
            stack: ( process.env.NODE_ENV == "dev") ? err.stack : "production"
        })
    })
}