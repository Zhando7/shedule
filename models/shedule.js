const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  Определяем структуры коллекции 
    `sheduleSchema`, `lessonSchema`, 
    `speakerSchema`, `groupSchema` 
*/
const sheduleSchema = new Schema({
    day: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    month: {
        number: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
        title: {
            type: String,
            minlentgh: 5,
            maxlentgh: 20
        }
    },
    year: {
        type: Number,
        required: true
    },
    total: Number,
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lesson'
        }
    ]
},
{ 
    versionKey: false 
});

const lessonSchema = new Schema({
    id_shedule: {
        type: Schema.Types.ObjectId,
        ref: 'Shedule'
    },
    time_start: {
        hour: {
            type: Number,
            required: true,
            min: 1,
            max: 24
        },
        minutes: {
            type: Number,
            required: true,
            min: 1,
            max: 60
        }
    },
    time_end: {
        hour: {
            type: Number,
            required: true,
            min: 1,
            max: 24
        },
        minutes: {
            type: Number,
            required: true,
            min: 1,
            max: 60
        }
    },
    speakers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Speaker'
        }
    ],
    title: {
        type: String,
        required: true,
        minlentgh: 3,
        maxlentgh: 255
    },
    desc: {
        type: String,
        minlentgh: 3,
        maxlentgh: 255,
        default: undefined
    },
    location: {
        type: String,
        required: true,
        minlentgh: 3,
        maxlentgh: 255,
    },
    group: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ]
},
{
    versionKey: false
});

const speakerSchema = new Schema({
    id_lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    name: {
        type: String,
        minlentgh: 3,
        maxlentgh: 55,
    }
},
{
    versionKey: false
});

const groupSchema = new Schema({
    id_lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    title: {
        type: String,
        minlentgh: 3,
        maxlentgh: 255,
    }
},
{
    versionKey: false
});

const Shedule = mongoose.model('Shedule', sheduleSchema);
const Lesson = mongoose.model('Lesson', lessonSchema);
const Speaker = mongoose.model('Speaker', speakerSchema);
const Group = mongoose.model('Group', groupSchema);

// возвращаем список уроков на текущий месяц
Shedule.getLessons = (month, year) => {
    Shedule.find({
        month: { number: month },
        year: year
    }).
    populate('lesson').
    exec((err, doc) => {
        if(err) return console.log(err);

        return doc;
    });
}

// возвращаем список уроков на конкретный день
Shedule.getLessonsById = (id) => {
    Shedule.find({
        _id: id
    }).
    populate('lesson').
    exec((err, doc) => {
        if(err) return console.log(err);

        return doc;
    });
}

module.exports = {
    Shedule: Shedule,
    Lesson: Lesson,
    Speaker: Speaker,
    Group: Group
};