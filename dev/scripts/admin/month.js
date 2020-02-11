console.log("Hello, admin");

/*
* Initialization of the Sidenav
*/
document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
});

function checkValue(month) {
    if( month >= 1 && month <= 12) {
        return true;
    } else {
        M.toast({html: 'Неправильное значение поля: "Выберите месяц"'});
        return false;
    }
}

/*
* To create the month
*/
document.getElementById("submitCreateMonth").addEventListener("click", function(e) {
    e.preventDefault();
    
    var form = document.querySelector("select"),
        id_year = document.getElementById("tableMonth").getAttribute("value"),
        month = {
            number: form.selectedIndex,
            title: form.options[form.selectedIndex].label
        };

    if(checkValue(month.number)) {
        let url = "/admin/month",
            data = JSON.stringify({ id_year, month }),
            xhr = new XMLHttpRequest();     // the XHR class instance creation

        // send a request to server
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive and parse the server response
            let json = JSON.parse(xhr.response);
            
            if(xhr.readyState == 4 && xhr.status == 200) {
                form.selectedIndex = 0;
                addRowToTable.call(json.docs, "tableMonth");
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});

function addRowToTable(idHtmlElement) {
    var table = document.getElementById(idHtmlElement),
        row = table.insertRow(table.length);
    
    // filling the created row with cells
    var cellId = row.insertCell(0),
        cellMonth = row.insertCell(1),
        cellOperation = row.insertCell(2);

    // setting the required attributes
    row.setAttribute("id", `tr__${this._id}`);
    cellId.setAttribute("class", "hide-on-small-only")
    cellMonth.setAttribute("id", `td__${this._id}`);

    // filling the cells with the entered values
    cellId.innerHTML = `${this._id}`;
    cellMonth.innerHTML = `<a href="/admin/date/${this._id}">${this.month.title}</a>`;
    cellOperation.innerHTML = getOperation.call(this);
}

function getOperation() {
    var { _id } = this,
        opEdit = `<a onclick="editSelectMonth('${_id}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
        opDelete = `<a onclick="delSelectMonth('${_id}')" class="waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
        op = opEdit + " " + opDelete;
    
    return op;
}

// to delete the selected year
function delSelectMonth(id) {
    if(id) {
        let url = `/admin/month/${ id }`,
            xhr = new XMLHttpRequest();     // the XHR class instance creation
        
        // to send a request to delete the selected year
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
    } else {
        return null;
    }
}

/*
* Editing the selected month
*/
function editSelectMonth(id) {
    if(id) {
        let url = `/admin/month/select/${id}`,
            xhr = new XMLHttpRequest();     // the XHR class instance creation

        // to send a request to get the selected year
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);
            
            if(xhr.readyState == 4 && xhr.status == 200) {
                /*
                * to set the attribute and value of the `select` HTML element
                */
                let selectEditForm = document.forms["editForm"].querySelector("select");
                
                document.forms["editForm"].setAttribute("value", json.docs._id);
                selectEditForm.selectedIndex = json.docs.month.number;

                triggerForm(true);  // to show the `editForm` HTML element of the selected year
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(null);
    } else {
        return null;
    }
}

function triggerForm(bool, id = null, month = null) {
    var rowYear = document.getElementsByClassName("__month"),
        editForm = document.getElementsByClassName("__month-edit");

    function displayRowMonth(v) {
        for(let i = 0; i < rowYear.length; i++ ) {
            rowYear[i].style.display = v;
        }
    }

    switch(bool) {
        case true: {
            displayRowMonth("none");
            editForm[0].style.display = "block";
            break;
        }
        case false: {
            editForm[0].style.display = "none";
            displayRowMonth("block");
            document.getElementById(`td__${id}`).innerHTML = `<a href="/admin/date/${id}">${month}</a>`;
            break;
        }
        default: {
            editForm[0].style.display = "none";
            displayRowMonth("block");
            break;
        }
    }
}

document.getElementById("submitEditMonth").addEventListener("click", function(e) {
    e.preventDefault();

    var form = document.forms["editForm"].querySelector("select"),
        _id = document.forms["editForm"].getAttribute("value"),
        month = {
            number: form.selectedIndex,
            title: form.options[form.selectedIndex].label
        };
    
    if(checkValue(month.number)) {
        let url = "/admin/month",
            data = JSON.stringify({ _id, month }),
            xhr = new XMLHttpRequest();     // the XHR class instance creation

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                triggerForm(false, _id, month.title);
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});