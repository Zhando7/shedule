const moment = require('../moment-conf');
const Lessons = require('../models/lessons');

exports.getIndex = (req ,res) => {
    const currentDate = {
        year: moment().year(),
        month: moment().month()
    }
    const data = Lessons.getLessons(currentDate.month, currentDate.year);

    // const shedule = [
    //     {
    //         weekDay: 0,
    //         day: 1
    //     },
    //     {
    //         weekDay: 0,
    //         day: 2
    //     },
    //     {
    //         weekDay: 3,
    //         day: 9
    //     },
    //     {
    //         weekDay: 2,
    //         day: 5
    //     },
    //     {
    //         weekDay: 2,
    //         day: 7
    //     },
    //     {
    //         weekDay: 3,
    //         day: 11
    //     },
    //     {
    //         weekDay: 1,
    //         day: 3
    //     },
    //     {
    //         weekDay: 1,
    //         day: 4
    //     },
    // ];

    // const sortShedule = shedule.sort((a, b) => a.weekDay - b.weekDay).sort((a, b) => a.day - b.day);
    // const countWeekDay = sortShedule.reduce((r, a) => {
    //     r[a.weekDay] = [...r[a.weekDay] || [], a];
    //     return r;
    // }, {});

    // console.log(sortShedule);
    // console.log(countWeekDay);

    res.render('index', {
        lessons: data
    });
}