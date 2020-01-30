console.log('Hello, admin');

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    // To get form data
    let mainForm = document.forms["createForm"],
        year = mainForm.elements["year"].value;

    // serialize form data to JSON
    let dataForm = JSON.stringify({ year });

    // creating an instance of XHR
    let xhr = new XMLHttpRequest();

    // send a request to the URL
    xhr.open("POST", "/admin/year", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {

        // receive and parse server response
        let json = JSON.parse(xhr.response);
        (xhr.status == 200) ? addRowToTable(json) : console.log(json.message);
    });
    xhr.send(dataForm);
});

function addRowToTable(json) {
    let table = document.getElementById("tableYear");
    
    let len = table.length;

    let row = table.insertRow(len);

    let cellId = row.insertCell(0),
        cellYear = row.insertCell(1),
        cellOperation = row.insertCell(2);
    
    cellId.innerHTML = `${json.docs._id}`;
    cellYear.innerHTML = `${json.docs.year}`;
    cellOperation.innerHTML = getOperation();
}

function getOperation() {
    let opEdit = '<a href="#"><i class="small material-icons">edit</i></a>';
    let opDelete = '<a href="#"><i class="small material-icons">delete</i></a>';

    let op = opEdit + opDelete;
    return op;
}