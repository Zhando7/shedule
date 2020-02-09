/*
* Initialization of the Sidenav
*/
document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
});
/*
* End point `Initialization of the Sidenav`
*/

document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".timepicker");
    M.Timepicker.init(elems);
})

function checkValue(st, end, t, d) {
    var c = 0;
    st ? c++ : M.toast({ html: "Время начало урока не задано" });
    end ? c++ : M.toast({ html: "Время окончания урока не задано" });
    t ? c++ : M.toast({ html: "Название урока не задано" });
    d ? c++ : M.toast({ html: "Описание урока не задано" });
    if(c == 4 && t.length >=3 && d.length>= 3) {
        return true;
    }
}

function clearCreateFormInputs() {
    var timePicker = document.forms["createForm"].querySelectorAll(".timepicker");
    timePicker[0].value = "";
    timePicker[1].value = "";
    document.getElementById("titleCreate").value = "";
    document.getElementById("descCreate").value = "";
}

/*
* To create lesson
*/
document.getElementById("submitCreateLesson").addEventListener("click", function (e) {
    e.preventDefault();
    var timePicker = document.forms["createForm"].querySelectorAll(".timepicker"),
        time_start = timePicker[0].value,
        time_end = timePicker[1].value,
        title = document.getElementById("titleCreate").value,
        desc = document.getElementById("descCreate").value;
    
    if(checkValue(time_start, time_end, title, desc)) {
        let id_date = document.getElementById("tableLesson").getAttribute("value"),
            url = "/admin/lesson",
            xhr = new XMLHttpRequest(),     // the XHR class instance creation
            data = JSON.stringify({ id_date, time_start, time_end, title, desc });

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);
            
            if(xhr.readyState == 4 && xhr.status == 200) {
                clearCreateFormInputs();
                addRowToTable.call(json.docs);
            } else {
                console.log(json.msg);
            }
        });
        xhr.send(data);
    }
});

function addRowToTable() {
    var table = document.getElementById("tableLesson"),
        row = table.insertRow(table.length);

    // filling the created row with cells
    var cellTime = row.insertCell(0),
        cellTitle = row.insertCell(1),
        cellDesc = row.insertCell(2),
        cellOperation = row.insertCell(3);
    
    // setting the required attributes
    row.setAttribute("id", `tr__${this._id}`);
    cellTime.setAttribute("id", `time__${this._id}`);
    cellTitle.setAttribute("id", `title__${this._id}`);
    cellDesc.setAttribute("id", `desc__${this._id}`);

    // filling the cells with entered values
    cellTime.innerHTML = `${this.time_start} - ${this.time_end}`;
    cellTitle.innerHTML = this.title;
    cellDesc.innerHTML = this.desc;
    cellOperation.innerHTML = getOperation.call(this);
}

function getOperation() {
    var { _id } = this;

    var opEdit = `<a onclick="editSelectLesson('${_id}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
        opDelete = `<a onclick="delSelectLesson('${_id}')" class="waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
        op = opEdit + " " + opDelete;
    
    return op;
}

function delSelectLesson(id) {
    var url = `/admin/lesson/${id}`,
        xhr = new XMLHttpRequest(); // the XHR class instance creation

    // send a request to delete the selected lesson
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        // receive and parse the server response
        var json = JSON.parse(xhr.response);

        if(xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById(`tr__${id}`).remove();
        } else {
            console.log(json.msg);
        }
    });

    xhr.send(null);
}
/*
* End point 'To create lesson'
*/

/*
* To edit the selected date
*/
function editSelectLesson(id) {
    var url = `/admin/lesson/select/${id}`,
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

function triggerForm(bool, id = null, lesson = null) {
    var rowLesson = document.getElementsByClassName("__lesson"),
        editForm = document.getElementsByClassName("__lesson-edit");

    function displayRowLesson(v) {
        for(let i = 0; i < rowLesson.length; i++ ) {
            rowLesson[i].style.display = v;
        }
    }

    switch(bool) {
        case true: {
            displayRowLesson("none");
            editForm[0].style.display = "block";
            break;
        }
        case false: {
            editForm[0].style.display = "none";
            displayRowLesson("block");
            document.getElementById(`time__${id}`).innerHTML = lesson.time_start + " - " + lesson.time_end;
            document.getElementById(`title__${id}`).innerHTML = lesson.title;
            document.getElementById(`desc__${id}`).innerHTML = lesson.desc;
            break;
        }
        default: {
            editForm[0].style.display = "none";
            displayRowLesson("block");
            break;
        }
    }
}
document.getElementById("submitEditLesson").addEventListener("click", function (e) {
    e.preventDefault();

    var timePicker = document.forms["editForm"].querySelectorAll(".timepicker"),
        time_start = timePicker[0].value,
        time_end = timePicker[1].value,
        title = document.getElementById("titleEdit").value,
        desc = document.getElementById("descEdit").value;
    
    if(checkValue(time_start, time_end, title, desc)) {
        var url = "/admin/lesson",
            xhr = new XMLHttpRequest(), // the XHR class instanse creation
            _id = document.forms["editForm"].getAttribute("value"),
            data = JSON.stringify({ _id, time_start, time_end, title, desc });

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive ad parse the serve response
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                triggerForm(false, _id, JSON.parse(data));
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});
/*
* End point `To edit the selected lesson`
*/