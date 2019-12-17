const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const staticAsset = require('static-asset');
const homeRouter = require('./routes/homeRouter');
const lessonsRouter = require('./routes/lessonsRouter');

const app = express();

app.set('view engine', 'ejs'); // Для рендеринга страниц задаем движок `ejs`
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* 
    `staticAsset` используем для создания опечатков 
    в URL закэшированных файлов 
*/
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lessons', lessonsRouter);
app.use('/', homeRouter);

module.exports = app;