module.exports = (app, express) => {
    const path = require('path'),
        bodyParser = require('body-parser'),
        staticAsset = require('static-asset'),
        monthRouter = require('../routes/month'),
        calendarRouter = require('../routes/calendar');

    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /* 
    * `staticAsset` используем для создания опечатков 
    * в URL закэшированных статических файлов 
    */
    app.use(staticAsset(path.join(__dirname, '../public')));
    app.use(express.static(path.join(__dirname, '../public')));

    /*
    * Маршрутизация
    */
    app.use('/month', monthRouter);
    app.use('/', calendarRouter);

    /*
    * Обрабатываем ошибки
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