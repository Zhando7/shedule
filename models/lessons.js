const lessons = [
    {
        id: 1,
        date: {
            day: 12,
            month: 12,
            year: 2019,
            total: 3,
            lessons: [
                {
                    id: 1,
                    time_start: {
                        hour: '09',
                        minutes: '30'
                    },
                    time_end: {
                        hour: '10',
                        minutes: '30'
                    },
                    speakers: 'Ахметкаримов Жандос Ерболович',
                    title: 'Работа в программе Visual Studio',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 1 (с русским языком обучения)'
                },
                {
                    id: 2,
                    time_start: {
                        hour: '10',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '11',
                        minutes: '00'
                    },
                    speakers: 'Маликов Руслан',
                    title: 'Работа в программе PTC Creo Parametric',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 3 (с русским языком обучения)'
                },
                {
                    id: 3,
                    time_start: {
                        hour: '14',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '15',
                        minutes: '00'
                    },
                    speakers: 'Соболев Дмитрий',
                    title: 'Работа в программе Adobe Premiere',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 2 (с русским языком обучения)'
                },
            ]
        }
    },
    {
        id: 2,
        date: {
            day: 24,
            month: 12,
            year: 2019,
            total: 2,
            lessons: [
                {
                    id: 1,
                    time_start: {
                        hour: '09',
                        minutes: '30'
                    },
                    time_end: {
                        hour: '09',
                        minutes: '30'
                    },
                    speakers: 'Ахметкаримов Жандос Ерболович',
                    title: 'Работа в программе Visual Studio',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 1 (с русским языком обучения)'
                },
                {
                    id: 2,
                    time_start: {
                        hour: '10',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '11',
                        minutes: '00'
                    },
                    speakers: 'Маликов Руслан',
                    title: 'Работа в программе PTC Creo Parametric',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 3 (с русским языком обучения)'
                },
            ]
        }
    },
    {
        id: 3,
        date: {
            day: 22,
            month: 12,
            year: 2019,
            total: 3,
            lessons: [
                {
                    id: 1,
                    time_start: {
                        hour: '09',
                        minutes: '30'
                    },
                    time_end: {
                        hour: '09',
                        minutes: '30'
                    },
                    speakers: 'Ахметкаримов Жандос Ерболович',
                    title: 'Работа в программе Visual Studio',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 1 (с русским языком обучения)'
                },
                {
                    id: 2,
                    time_start: {
                        hour: '10',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '11',
                        minutes: '00'
                    },
                    speakers: 'Маликов Руслан',
                    title: 'Работа в программе PTC Creo Parametric',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 3 (с русским языком обучения)'
                },
                {
                    id: 3,
                    time_start: {
                        hour: '14',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '15',
                        minutes: '00'
                    },
                    speakers: 'Соболев Дмитрий',
                    title: 'Работа в программе Adobe Premiere',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 2 (с русским языком обучения)'
                },
            ]
        }
    },
    {
        id: 4,
        date: {
            day: 26,
            month: 12,
            year: 2019,
            total: 3,
            lessons: [
                {
                    id: 1,
                    time_start: {
                        hour: '09',
                        minutes: '30'
                    },
                    time_end: {
                        hour: '09',
                        minutes: '30'
                    },
                    speakers: 'Ахметкаримов Жандос Ерболович',
                    title: 'Работа в программе Visual Studio',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 1 (с русским языком обучения)'
                },
                {
                    id: 2,
                    time_start: {
                        hour: '10',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '11',
                        minutes: '00'
                    },
                    speakers: 'Маликов Руслан',
                    title: 'Работа в программе PTC Creo Parametric',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 3 (с русским языком обучения)'
                },
                {
                    id: 3,
                    time_start: {
                        hour: '14',
                        minutes: '00'
                    },
                    time_end: {
                        hour: '15',
                        minutes: '00'
                    },
                    speakers: 'Соболев Дмитрий',
                    title: 'Работа в программе Adobe Premiere',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 2 (с русским языком обучения)'
                },
            ]
        }
    },
    {
        id: 5,
        date: {
            day: 13,
            month: 12,
            year: 2019,
            total: 1,
            lessons: [
                {
                    id: 1,
                    time_start: {
                        hour: '09',
                        minutes: '30'
                    },
                    time_end: {
                        hour: '09',
                        minutes: '30'
                    },
                    speakers: 'Ахметкаримов Жандос Ерболович',
                    title: 'Работа в программе Visual Studio',
                    desc: undefined,
                    location: 'г.Усть-Каменогорск, ул.Абая 21, 2 этаж',
                    group: 'Группа 1 (с русским языком обучения)'
                },
            ]
        }
    },
];

exports.getLessons = (month, year) => lessons.filter( les => les.date.month == month && les.date.year == year);

exports.getLessonsById = id => lessons.find( les => les.id == id);