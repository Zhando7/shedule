const path = require('path');
const dotenv = require('dotenv');

const root = path.join.bind(this, __dirname);
dotenv.config({ path: root('../.env') });

module.exports = {
    PORT: process.env.PORT || 3000,
    IS_PRODUCTION: process.env.NODE_ENV,
    MONGO_URL: process.env.MONGO_URL,
    session: {
        secret: process.env.SESSION_SECRET,
        cookie: {
            originalMaxAge: null,
            httpOnly: true,
            path: '/',
            expires: null
        }
    },
    admin: {
        name: process.env.ADMIN_NAME,
        password: process.env.ADMIN_PASSWORD
    }
};