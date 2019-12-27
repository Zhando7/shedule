const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticAsset = require('static-asset');
const conf = require('./config');
const homeRouter = require('./routes/homeRouter');
const lessonsRouter = require('./routes/lessonsRouter');
const app = express();

// mongoose
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

app.set('view engine', 'ejs'); // Для рендеринга страниц задаем движок `ejs`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* 
    `staticAsset` используем для создания опечатков 
    в URL закэшированных статических файлов 
*/
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Система маршрутизации
app.get('/lessons', lessonsRouter);
app.get('/', homeRouter);

// Ловим 404 и передаем в следующий обработчик
app.use((req, res, next) => {
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: !conf.IS_PRODUCTION ? error : {}
    });
});

app.listen(conf.PORT, () => {
    console.log(`Web app listening on port:${conf.PORT}`)
});