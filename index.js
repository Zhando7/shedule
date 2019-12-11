const app = require('./app');
const conf = require('./config');
const database = require('./database');

database()
.then(info => {
    console.log(`Connected to ${info.host}:${conf.PORT}/${info.name}`);
    app.listen(conf.PORT, () => {
        console.log(`Web app listening ${info.host}:${conf.PORT}`)
    });
})
.catch(() => {
    console.log('Unable to connect to database');
    process.exit(1);
});
