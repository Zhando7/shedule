const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// parse json
const   year = require('./yearSchema.json'),
        month = require('./monthSchema.json'),
        date = require('./dateSchema.json'),
        lesson = require('./lessonSchema.json');

// create a schema
const   yearSchema = Schema(year, { versionKey: false }),
        monthSchema = Schema(month, { versionKey: false }),
        dateSchema = Schema(date, { versionKey: false }),
        lessonSchema = Schema(lesson, { versionKey: false });

// compile a schema
const   Year = mongoose.model('Years', yearSchema),
        Month = mongoose.model('Months', monthSchema),
        nDate = mongoose.model('Dates', dateSchema),
        Lesson = mongoose.model('Lessons', lessonSchema);

module.exports = {
    Year: Year,
    Month: Month,
    nDate: nDate,
    Lesson: Lesson
};