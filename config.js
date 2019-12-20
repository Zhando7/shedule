module.exports = {
    PORT: process.env.PORT || 3000,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    MONGO_URL: 'mongodb://localhost:27017/shedule'
    // MONGO_URL: 'mongodb+srv://zhandos:mongodb123456@newcluster-kv3l3.mongodb.net/test?retryWrites=true&w=majority'
};