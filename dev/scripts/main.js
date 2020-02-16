console.log('Hello');

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
    if(n && p) {
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

function checkExistsDates(el){
    if(this && el) {
        if(this.docs.length) {
            createCalendar(el, this.docs)
        } else {
            document.getElementById("calendar").style.display = "none";
            M.toast({ html: "Данный месяц не заполнен датами" });
        } 
    }
}

function findSelectMonth(el, id) {
    document.getElementById("tableLessons").style.display = "none";
    
    if(el && id) {
        let url = `/view/dates/${id}`,
            xhr = new XMLHttpRequest();
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                checkExistsDates.call(json, el);
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
            table += createCell.call(docs, j);
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

function createCell(i) {
    var attribId = `id="${this[i]._id}"`,
        attribOnClick = `onclick="getLessons('${this[i]._id}')"`,
        dateValue = new Date(this[i].full_date).getDate(),
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
    if(id) {
        let url = `/view/lessons/${id}`,
            xhr = new XMLHttpRequest();
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                if(json.docs.length) {
                    createLessonsTable.call(json.docs)
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

function createLessonsTable() {
    if(this) {
        let table = document.getElementById("tableLessons"),
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
        
        while(i < this.length) {
            start += `
                <tr>
                    <td>${this[i].time_start} - ${this[i].time_end}</td>
                    <td>${this[i].title}</td>
                    <td>${this[i].desc}</td>
                </tr>
            `
            i++;
        }
        table.style.display = "block";
        table.innerHTML = start + end;
    }
}