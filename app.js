const express = require('express'),
    app = express(),
    conf = require('./config'),
    middleware = require('./middleware')(app, express);

app.listen(conf.PORT, () => {
    console.log(`Express server listening on port:${conf.PORT}`)
});