const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('../.env') });

module.exports = {
    PORT: process.env.PORT || 3000,
    IS_PRODUCTION: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL
};