const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// parse json
const   month = require('./monthSchema.json'),
        day = require('./daySchema.json'),
        lesson = require('./lessonSchema.json');

// create a schema
const   monthSchema = Schema(month, { versionKey: false }),
        daySchema = Schema(day, { versionKey: false }),
        lessonSchema = Schema(lesson, { versionKey: false });

// compile a schema
const   Month = mongoose.model('Months', monthSchema),
        Day = mongoose.model('Days', daySchema),
        Lesson = mongoose.model('Lessons', lessonSchema);

module.exports = {
    Month: Month,
    Day: Day,
    Lesson: Lesson
};