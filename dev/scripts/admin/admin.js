console.log('Hello, admin');

/*
* To create the year
*/
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    // to get the `year` value from the form `createForm`
    let form = document.forms["createForm"],
        method = form.getAttribute("method"),
        year = form.elements["year"].value,
        url = "/admin/year",
        data, id,
        xhr = new XMLHttpRequest();         // the XHR class instance creation
    
    // switch(method) {
    //     case "POST": {
    //         data = JSON.stringify({ year });    // serialize the year into JSON
    //         break;
    //     }
    //     case "PUT": {
    //         id = form.getAttribute("id");
    //         data = JSON.stringify({ id, year });    // serialize the year into JSON
    //         break;
    //     }
    //     default: {
    //         return null;
    //     }
    // }
    data = JSON.stringify({ year });
    // send a request to server
    xhr.open("POST", url, true);
    // xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
        // receive and parse the server response 
        let json = JSON.parse(xhr.response);
        if(xhr.readyState == 4 && xhr.status == "200") {
            // (form.getAttribute("method") == "POST") ? addRowToTable(json.docs) : updateRowToTable(id);
            addRowToTable(json.docs)
        } else {
            console.log(json.msg);
        }
    });

    xhr.send(data);
});

function addRowToTable(json) {
    let table = document.getElementById("tableYear"),
        len = table.length,
        row = table.insertRow(len);

    let cellId = row.insertCell(0),
        cellYear = row.insertCell(1),
        cellOperation = row.insertCell(2);

    row.setAttribute(`id`, `tr__${json._id}`);
    cellId.innerHTML = `${json._id}`;
    cellYear.innerHTML = `${json.year}`;
    cellOperation.innerHTML = setOperation(json);
}

function setOperation(json) {
    let { _id, year } = json;

    let opEdit = `<a onclick="editSelectYear('${_id}', '${year}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
        opDelete = `<a onclick="delSelectYear('${_id}')" class="removeLink waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
        op = opEdit + opDelete;
    
    return op;
}

// editing the select year
function editSelectYear(id, year) {
    document.forms["createForm"].setAttribute("method", "PUT");
    document.forms["createForm"].setAttribute("id", id);
    document.forms["createForm"].elements[0].value=year;
}

function updateRowToTable(id) {
    let row = document.getElementById(`${id}`);

}

// deleting the select year
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
            
        if(xhr.readyState == 4 && xhr.status == "200") {
            document.getElementById(`tr__${id}`).remove();
        } else {
            console.log(json.msg);
        }
    });

    xhr.send(null);
}