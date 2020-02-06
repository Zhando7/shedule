console.log('Hello, admin');

function checkValue(year) {
    if(year == "") {
        M.toast({html: 'Заполните поле: "Введите год'});
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
    // to get the `year` value from the form `createForm`
    let form = document.forms["createForm"],
        year = form.elements["year"].value;
    
    if(checkValue(year)) {
        let url = "/admin/year",
            data = JSON.stringify({ year }),
            xhr = new XMLHttpRequest();         // the XHR class instance creation
    
        // send a request to server
        xhr.open("POST", url, true);
        // xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function () {
            // receive and parse the server response 
            let json = JSON.parse(xhr.response);
            if(xhr.readyState == 4 && xhr.status == 200) {
                form.elements["year"].value = "";
                addRowToTable(json.docs);
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    }
});

function addRowToTable(json) {
    let table = document.getElementById("tableYear"),
        row = table.insertRow(table.length);

    // filling the created row with cells
    let cellId = row.insertCell(0),
        cellYear = row.insertCell(1),
        cellOperation = row.insertCell(2);

    // setting the required attributes
    row.setAttribute("id", `tr__${json._id}`);
    cellId.setAttribute("class", "hide-on-small-only")
    cellYear.setAttribute("id", `td__${json._id}`);

    // filling the cells with entered values
    cellId.innerHTML = `${json._id}`;
    cellYear.innerHTML = `<a href="/admin/month/${json._id}">${json.year}</a>`;
    cellOperation.innerHTML = getOperation(json);
}

function getOperation(json) {
    let { _id, year } = json;

    let opEdit = `<a onclick="editSelectYear('${_id}', '${year}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
        opDelete = `<a onclick="delSelectYear('${_id}')" class="removeLink waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
        op = opEdit + " " + opDelete;
    
    return op;
}

// to delete the selected year
function delSelectYear(id) {
    let url = `/admin/year/${ id }`;

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
* End point `To create the year`
*/

/*
* To edit the selected year
*/
function editSelectYear(id) {
    let url = `/admin/year/select/${id}`;
    // the XHR class instance creation
    let xhr = new XMLHttpRequest();

    // send a request to select the selected year
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        // receive and parse the server response
        let json = JSON.parse(xhr.response);

        if(xhr.readyState == 4 && xhr.status == 200) {
            triggerForm(true);  // to show the `editForm` HTML element of selected year
            /*
            * to set the attribute and value of the `input` HTML element
            */
            let inputEditForm = document.forms["editForm"][0];
                document.forms["editForm"].setAttribute("value", json.docs._id);
                inputEditForm.value = json.docs.year;
        } else {
            console.log(json.msg);
        }
    });

    xhr.send(null);
}

function triggerForm(bool, id = null, year = null) {
    let rowYear = document.getElementsByClassName("__year");
    let editForm = document.getElementsByClassName("__year-edit");

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
            document.getElementById(id).innerHTML = `<a href="/admin/month/${id}">${year}</a>`;
            break;
        }
        default: {
            editForm[0].style.display = "none";
            displayRowYear("block");
            break;
        }
    }
}

document.getElementById("submitEditYear").addEventListener("click", function(e) {
    e.preventDefault();

    let form = document.forms["editForm"],
        year = form[0].value;
    
    if(checkValue(year)) {
        let url = "/admin/year",
            _id = form.getAttribute("value"),
            data = JSON.stringify({ _id, year }),
            xhr = new XMLHttpRequest();     // the XHR class instance creation

        xhr.open("PUT", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            let json = JSON.parse(xhr.response);
            if(xhr.readyState == 4 && xhr.status == 200) {
                triggerForm(false, `td__${_id}`, year);
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