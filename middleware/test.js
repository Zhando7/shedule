let docs = [
    {
        date: new Date(2020, 1, 1)
    },
    {
        date: new Date(2020, 1, 3)
    },
    {
        date: new Date(2020, 1, 4)
    },
    {
        date: new Date(2020, 1, 5)
    },
    {
        date: new Date(2020, 1, 6)
    },
    {
        date: new Date(2020, 1, 7)
    },
    {
        date: new Date(2020, 1, 8)
    },
    {
        date: new Date(2020, 1, 10)
    },
    {
        date: new Date(2020, 1, 11)
    },
    {
        date: new Date(2020, 1, 12)
    },
    {
        date: new Date(2020, 1, 13)
    },
    {
        date: new Date(2020, 1, 14)
    },
    {
        date: new Date(2020, 1, 15)
    },
    {
        date: new Date(2020, 1, 17)
    },
    {
        date: new Date(2020, 1, 18)
    },
    {
        date: new Date(2020, 1, 19)
    },
    {
        date: new Date(2020, 1, 20)
    },
    {
        date: new Date(2020, 1, 21)
    },
    {
        date: new Date(2020, 1, 22)
    },
    {
        date: new Date(2020, 1, 24)
    },
    {
        date: new Date(2020, 1, 25)
    },
    {
        date: new Date(2020, 1, 26)
    },
    {
        date: new Date(2020, 1, 27)
    },
    {
        date: new Date(2020, 1, 28)
    },
    {
        date: new Date(2020, 1, 29)
    },
];

function createCalendar(elem, docs) {
    let j = 0;
    let firstDay = docs[0].date.getDay();
    let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    // пробелы для первого ряда
    // с понедельника до первого дня месяца
    for( let i = 1; i < firstDay; i++ ) {
        table += '<td></td>';
        console.log('Пустые ячейки');
    }

    // <td> ячейки календаря с датами
    while( j < docs.length ) {
        table += "<td>" + docs[j].date.getDate() + "</td>";
        
        console.log(docs[j].date.getDate());

        if( docs[j].date.getDay() == 6 /* && j < ( docs.length - 1) */ ) {
            console.log('Новый ряд');
            table += "</tr><tr>";
        }

        j++;
    }
    console.log('THE END');
    table += "</tr></table>";
    // elem.innerHtml = table;
}

createCalendar(null, docs);