/*
* the `DatePicker` HTML element initialization
*/
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var options = {
        disableWeekends: true,
        i18n: {
            months: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ],
            weekdaysAbbrev: ['В','П','В','С','Ч','П','С']
        },
    };
    M.Datepicker.init(elems, options);
});
/*
* End point "the `DatePicker` HTML element initialization"
*/

function checkValue(v) {
    if(v) {
        return true;
    } else {
        M.toast({ html: "Вы не выбрали дату!" });
    }
}

function getFormatDate(v) {
    var date = new Date(v);
    return date.getDate();
}

/*
* To create date
*/
document.getElementById("submitCreateDate").addEventListener("click", function(e) {
    e.preventDefault();
    // to get of the `datepicker` value
    var datePicker = document.querySelector(".datepicker");

    if(checkValue(datePicker.value)) {
        var xhr = new XMLHttpRequest(), // the XHR class instance creation
            url = "/admin/date",
            id_month = document.getElementById("tableDate").getAttribute("value"),
            full_date = new Date(datePicker.value),
            data = JSON.stringify({ id_month, full_date });
       
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                datePicker.value = "";
                addRowToTable.call(json.docs);
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});

function addRowToTable() {
    let table = document.getElementById("tableDate"),
        row = table.insertRow(table.length);
    
    // filling the created row with cells
    var cellId = row.insertCell(0),
        cellDate = row.insertCell(1),
        cellOperation = row.insertCell(2);

    // setting the required attributes
    row.setAttribute("id", `tr__${this._id}`);
    cellId.setAttribute("class", "hide-on-small-only")
    cellDate.setAttribute("id", `td__${this._id}`);

    // filling the cells with entered values
    cellId.innerHTML = `${this._id}`;
    cellDate.innerHTML = `<a href="/admin/lesson/${this._id}">${getFormatDate(this.full_date)}</a>`;
    cellOperation.innerHTML = getOperation.call(this);
}

function getOperation() {
    var { _id } = this;

    var opEdit = `<a onclick="editSelectDate('${_id}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
        opDelete = `<a onclick="delSelectDate('${_id}')" class="waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
        op = opEdit + " " + opDelete;
    
    return op;
}

// to delete the selected date
function delSelectDate(id) {
    let url = `/admin/date/${ id }`;

    // the XHR class instance creation
    let xhr = new XMLHttpRequest();
    
    // send a request to delete the selected year
    xhr.open('DELETE', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
        // receive and parse the server response
        let json = JSON.parse(xhr.response);
            
        if(xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById(`tr__${id}`).remove();
        } else {
            console.log(json.msg);
        }
    });

    xhr.send(null);
}
/*
* End point `To create date`
*/

/*
* To edit the selected date
*/
function editSelectDate(id) {
    var url = `/admin/date/select/${id}`,
        xhr = new XMLHttpRequest(); // the XHR class instance creation

    // send a request to select the selected date
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        // receive and parse the server response
        var json = JSON.parse(xhr.response);
        
        if(xhr.readyState == 4 && xhr.status == 200) {
            triggerForm(true);  // to show the `editForm` HTML element of selected date
            /*
            * to set the attribute and value of the `editForm` HTML element
            */
            document.forms["editForm"].setAttribute("value", json.docs._id);
        } else {
            console.log(json.msg);
        }
    });

    xhr.send(null);
}

function triggerForm(bool, id = null, date = null) {
    let rowDate = document.getElementsByClassName("__date");
    let editForm = document.getElementsByClassName("__date-edit");

    function displayRowDate(v) {
        for(let i = 0; i < rowDate.length; i++ ) {
            rowDate[i].style.display = v;
        }
    }

    switch(bool) {
        case true: {
            displayRowDate("none");
            editForm[0].style.display = "block";
            break;
        }
        case false: {
            editForm[0].style.display = "none";
            displayRowDate("block");
            document.getElementById(id).innerHTML = `<a href="/admin/date/${id}">${getFormatDate(date)}</a>`;
            break;
        }
        default: {
            editForm[0].style.display = "none";
            displayRowDate("block");
            break;
        }
    }
}

document.getElementById("submitEditDate").addEventListener("click", function (e) {
    e.preventDefault();

    var newDate = document.forms["editForm"].querySelector(".datepicker");

    if(checkValue(newDate.value)) {
        var url = "/admin/date",
            xhr = new XMLHttpRequest(), // the XHR class instanse creation
            _id = document.forms["editForm"].getAttribute("value"),
            full_date = newDate.value,
            data = JSON.stringify({ _id, full_date });

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive ad parse the serve response
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                triggerForm(false, `td__${_id}`, full_date);
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});
/*
* End point `To edit the selected date`
*/