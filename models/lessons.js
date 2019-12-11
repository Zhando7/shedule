const lessons = [
    {
        id: 1,
        date: {
            day: 12,
            month: 12,
            year: 2019
        },
        time_start: '09:30',
        time_end: '10:30',
        speakers: 'Ахметкаримов Жандос Ерболович',
        title: 'Работа в программе Visual Studio',
        desc: '',
        location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
        group: 'Группа 1 (с русским языком обучения)'
    },
    {
        id: 2,
        date: {
            day: 24,
            month: 02,
            year: 2020
        },
        time_start: '09:30',
        time_end: '10:30',
        speakers: 'Соболев Дмитрий',
        title: 'Работа в программе Adobe Premiere',
        desc: '',
        location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
        group: 'Группа 2 (с русским языком обучения)'
    },
    {
        id: 3,
        date: {
            day: 13,
            month: 12,
            year: 2019
        },
        time_start: '11:00',
        time_end: '12:00',
        speakers: 'Маликов Руслан',
        title: 'Работа в программе Scratch',
        desc: '',
        location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
        group: 'Группа 2 (с русским языком обучения)'
    },
];

exports.getLessons = (month, year) => {
    return lessons.filter( les => les.date.month === Number(month) && les.date.year === Number(year));
}