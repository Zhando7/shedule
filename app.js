const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticAsset = require('static-asset');
const conf = require('./config/index');
// const indexRouter = require('./routes/indexRouter');
// const lessonRouter = require('./routes/lessonRouter');
const monthRouter = require('./routes/monthRouter');
const calendarRouter = require('./routes/calendarRouter');

const app = express();
/*
 * Подключение к БД
 * Start point
 */
mongoose.Promise = global.Promise;
mongoose.set('debug', conf.IS_PRODUCTION);

mongoose.connection
    .on('error', err => console.log(err))
    .on('close', () => console.log('Database connection closed!'))
    .on('open', () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${conf.PORT}/${info.name}`);
    });

mongoose.connect(conf.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// End point

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* 
 * `staticAsset` используем для создания опечатков 
 * в URL закэшированных статических файлов 
*/
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/*
 * Маршрутизация
 */
app.use('/month', monthRouter);
// app.use('/lesson', lessonRouter);
app.use('/', calendarRouter);

/*
 * Ловим ошибку и передаем в следующие обработчики
 * Start point
 */
app.use(function(req, res, next){
    res.status(404);
    res.render('error', { error: 'Not found' });
    return;
});
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('error', { error: err.message });
    return;
});
// End point

app.listen(conf.PORT, () => {
    console.log(`Web app listening on port:${conf.PORT}`)
});