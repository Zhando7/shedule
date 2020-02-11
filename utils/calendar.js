/*
* filling the desired month with dates
*/
exports.createDatesOfMonth = (data) => {
    var d = new Date( data.year, data.month - 1 ),
        dates = [];

    while( d.getMonth() == data.month - 1 ) {
        dates.push({
            id_month: data.id_month,
            full_date: `${d}`
        });
        d.setDate( d.getDate() +1 );
    }

    return dates;
}

/*
* functions for creating the calendar
*/
function createCell(j) {
    var attribId = `id="${this[j]._id}"`,
        attribOnClick = `onclick="getLessons('${this[j]._id}')"`,
        dateValue = new Date(this[j].full_date).getDate(),
        cell = `<td ${attribId} ${attribOnClick}>${dateValue}</td>`;

    return cell;
}

exports.createCalendar = (docs) => {
    var table = '<table class="striped centered"><thead><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th></tr></thead><tbody><tr>',
        firstDay = new Date(docs[0].full_date).getDay(),
        j = 0;
    
    /*
    * Пробелы для первого ряда
    * с понедельника до первого дня месяца
    */
    for( let i = 1; i < firstDay; i++ ) {
        table += '<td></td>';
    }

    // <td> ячейки календаря с датами
    while( j < docs.length ) {
        if( new Date(docs[j].full_date).getDay() != 0 ) {
            table += createCell.call(docs, j);
        }
        
        if( new Date(docs[j].full_date).getDay() == 6 && j < ( docs.length - 1)) {
            table += "</tr><tr>";   // новый ряд
        }
        
        j++;
    }

    table += "</tr></tbody></table>";
    return table;
}