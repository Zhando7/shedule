;console.log('Hello user');

/*
* Initialization of the modals boxes
*/
document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
});

/*
* Initialization of the Sidenav
*/
document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
});

/*
* Authorization
*/
function checkValue(n, p) {
    if(typeof n !== "undefined" && typeof p !== "undefined") {
        return true;
    } else {
        M.toast({ html: "Заполните все поля!" });
    }
}

document.getElementById("submitLogin").addEventListener("click", function(e) {
    e.preventDefault();

    var form = document.forms["loginForm"],
        name = form.elements["user_name"].value,
        password = form.elements["user_pass"].value;

    if(checkValue(name, password)) {
        let url = "/login",
            xhr = new XMLHttpRequest(),
            data = JSON.stringify({ name, password });

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                location.replace(document.baseURI + "admin");
            } else {
                M.toast({ html: json.msg });
            }
        });

        xhr.send(data);
    }
});

/*
* Functions for interacting with months, dates and lessons
*/

function checkExistsDates(json, el){
    if(typeof json.docs !== "undefined") {
        if(json.docs.length > 0) {
            createCalendar(el, json.docs)
        } else {
            document.getElementById("calendar").style.display = "none";
            M.toast({ html: "Выбранный месяц не заполнен датами" });
        } 
    }
}

function findSelectMonth(el, id) {
    document.getElementById("tableLessons").style.display = "none";
    
    if(typeof el !== "undefined" && typeof id !== "undefined") {
        let url = `/view/dates/${id}`,
            xhr = new XMLHttpRequest();
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                checkExistsDates(json, el);
            } else {
                console.log(json.msg);
            }
        });
        xhr.send(null);
    } else {
        return null;
    }
}

/*
* The function for deleting 
*/
function createCalendar(elem, docs) {
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
            table += createCell(docs, j);
        }
        
        if( new Date(docs[j].full_date).getDay() == 6 && j < ( docs.length - 1)) {
            table += "</tr><tr>";   // новый ряд
        }
        
        j++;
    }

    table += "</tr></tbody></table>";
    document.getElementById(`${elem}`).innerHTML = table;
    document.getElementById(`${elem}`).style.display = "block";
}

function createCell(docs, i) {
    var attribId = `id="${docs[i]._id}"`,
        attribOnClick = `onclick="getLessons('${docs[i]._id}')"`,
        dateValue = new Date(docs[i].full_date).getDate(),
        cell = `<td ${attribId} ${attribOnClick}>${dateValue}</td>`;

    return cell;
}
/*
* End point For deleting 
*/

/*
* Lessons
*/
function getLessons(id) {
    if(typeof id !== "undefined") {
        var url = `/view/lessons/${id}`,
            xhr = new XMLHttpRequest();
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                if(json.docs.length) {
                    createLessonsTable(json.docs);
                } else {
                    document.getElementById("tableLessons").style.display = "none";
                    M.toast({ html: "Уроков на эту дату не имеется" });
                }
            } else {
                console.log(json.msg);
            }
        });
        xhr.send(null);
    } else {
        return null;
    }
}

function createLessonsTable(docs) {
    if(typeof docs !== "undefined") {
        var table = document.getElementById("tableLessons"),
            start = `
                <table class="striped centered">
                <thead>
                    <tr>
                        <th>Время</th>
                        <th>Название</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>  
            `,
            end = `</tbody></table>`,
            i = 0;
        
        while(i < docs.length) {
            start += `
                <tr>
                    <td>${docs[i].time_start} - ${docs[i].time_end}</td>
                    <td>${docs[i].title}</td>
                    <td>${docs[i].desc}</td>
                </tr>
            `
            i++;
        }
        table.style.display = "block";
        table.innerHTML = start + end;
    }
}