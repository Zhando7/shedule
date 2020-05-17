;console.log('Hello, admin');

/*
* Initialization of the Sidenav
*/
document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
});

function checkValue(year) {
    if(!year) {
        M.toast({html: `Заполните поле: "Введите год"`});
    } else if( year >= 2020 && year <= 3000) {
        return true;
    } else {
        M.toast({html: 'Неправильное значение поля: "Введите год"'});
    }
    return false;
}

/*
* To create the year
*/
document.getElementById("submitCreateYear").addEventListener("click", function (e) {
    e.preventDefault();
    // to get the `year` input value from the `createForm` html element
    var form = document.forms["createForm"],
        year = form.elements["year"].value;
    
    if(checkValue(year)) {
        let url = "/admin/year",
            data = JSON.stringify({ year }),
            xhr = new XMLHttpRequest();         // the XHR class instance creation
    
        // to send a request to server
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function () {
            // receive and parse the server response 
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                form.elements["year"].value = "";
                addRowToTable(json.docs, "tableYear");
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});

function addRowToTable(docs, el) {
    if(typeof docs !== "undefined") {
        var table = document.getElementById(el),
            row = table.insertRow(table.length);
    
        // filling the created row with cells
        var cellId = row.insertCell(0),
            cellYear = row.insertCell(1),
            cellOperation = row.insertCell(2);

        // setting the required attributes
        row.setAttribute("id", `tr__${docs._id}`);
        cellId.setAttribute("class", "hide-on-small-only")
        cellYear.setAttribute("id", `td__${docs._id}`);

        // filling the cells with entered values
        cellId.innerHTML = `${docs._id}`;
        cellYear.innerHTML = `<a href="/admin/month/${docs._id}">${docs.year}</a>`;
        cellOperation.innerHTML = getOperation(docs);
    }
}

function getOperation(docs) {
    var { _id } = docs,
        opEdit = `<a onclick="editSelectYear('${_id}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
        opDelete = `<a onclick="delSelectYear('${_id}')" class="removeLink waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
        op = opEdit + " " + opDelete;
    
    return op;
}

// deleting the selected year
function delSelectYear(id) {
    if(typeof id !== "undefined") {
        var url = `/admin/year/${ id }`,
            xhr = new XMLHttpRequest();     // the XHR class instance creation
    
        // to send a request to delete the selected year
        xhr.open('DELETE', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function () {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);
                
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
* To edit the selected year
*/
function editSelectYear(id) {
    if(typeof id !== "undefined") {
        var url = `/admin/year/select/${id}`,
            xhr = new XMLHttpRequest();     // the XHR class instance creation

        // to send a request to get the selected year
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                /*
                * to set the attribute and value of the `input` HTML element
                */
                let inputEditForm = document.forms["editForm"][0];

                document.forms["editForm"].setAttribute("value", json.docs._id);
                inputEditForm.value = json.docs.year;
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

function triggerForm(bool, id = undefined, year = undefined) {
    var rowYear = document.getElementsByClassName("__year"),
        editForm = document.getElementsByClassName("__year-edit");

    function displayRowYear(v) {
        for(let i = 0; i < rowYear.length; i++ ) {
            rowYear[i].style.display = v;
        }
    }

    switch(bool) {
        case true: {
            displayRowYear("none");
            editForm[0].style.display = "block";
            break;
        }
        case false: {
            editForm[0].style.display = "none";
            displayRowYear("block");
            document.getElementById(`td__${id}`).innerHTML = `<a href="/admin/month/${id}">${year}</a>`;
            break;
        }
        default: {
            editForm[0].style.display = "none";
            displayRowYear("block");
        }
    }
}

document.getElementById("submitEditYear").addEventListener("click", function(e) {
    e.preventDefault();

    var form = document.forms["editForm"],
        _id = form.getAttribute("value"),
        year = form[0].value;
    
    if(checkValue(year)) {
        let url = "/admin/year",
            data = JSON.stringify({ _id, year }),
            xhr = new XMLHttpRequest();     // the XHR class instance creation

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);
            
            if(xhr.readyState == 4 && xhr.status == 200) {
                triggerForm(false, _id, year);
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});
/*
* End point `To edit the year selected`
*/