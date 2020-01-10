const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// parse json
const month = require('./monthSchema.json');

// create a schema
const monthSchema = Schema(month, { versionKey: false });

// compile a schema
const Month = mongoose.model('Months', monthSchema);

module.exports = [{
    Month: Month
}];