// function createCalendar(elem, docs) {
//     let table = '<table><thead><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th></tr></thead><tbody><tr>',
//         firstDay = docs[0].date.getDay(),
//         j = 0;

//     /*
//     * Пробелы для первого ряда
//     * с понедельника до первого дня месяца
//     */
//     for( let i = 1; i < firstDay; i++ ) {
//         table += '<td></td>';
//     }

//     // <td> ячейки календаря с датами
//     while( j < docs.length ) {
//         table += "<td>" + docs[j].date.getDate() + "</td>";

//         if( docs[j].date.getDay() == 5 /* && j < ( docs.length - 1) */ ) {
//             table += "</tr><tr>";   // новый ряд
//         }
        
//         j++;
//     }

//     table += "</tr></tbody></table>";
//     elem.innerHtml = table;
// }

// createCalendar(calendar, docs);