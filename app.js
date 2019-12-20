const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const staticAsset = require('static-asset');
const conf = require('./config');
const homeRouter = require('./routes/homeRouter');
const lessonsRouter = require('./routes/lessonsRouter');

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

// express
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

app.listen(conf.PORT, () => {
    console.log(`Web app listening on port:${conf.PORT}`)
});