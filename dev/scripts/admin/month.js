;console.log("Hello, admin");

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
            var json = JSON.parse(xhr.response);
            
            if(xhr.readyState == 4 && xhr.status == 200) {
                form.selectedIndex = 0;
                addRowToTable(json.docs, "tableMonth");
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
            cellMonth = row.insertCell(1),
            cellOperation = row.insertCell(2);

        // setting the required attributes
        row.setAttribute("id", `tr__${docs._id}`);
        cellId.setAttribute("class", "hide-on-small-only")
        cellMonth.setAttribute("onclick", `getDatesOfMonth("${docs._id}", "${docs.month.title}")`);

        // filling the cells with the entered values
        cellId.innerHTML = `${docs._id}`;
        cellMonth.innerHTML = `${docs.month.title}`;
        cellOperation.innerHTML = `<a onclick="delSelectMonth('${docs._id}')" class="waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`;
    }
}

// to delete the selected year
function delSelectMonth(id) {
    if(id) {
        var url = `/admin/month/${ id }`,
            xhr = new XMLHttpRequest();     // the XHR class instance creation
        
        // to send a request to delete the selected year
        xhr.open('DELETE', url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function () {
            // receive and parse the server response
            var json = JSON.parse(xhr.response);
                
            if(xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById(`tr__${id}`).remove();
                document.getElementsByClassName("dates")[0].style.display = "none";
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
* For interacting with dates
*/
function getDatesOfMonth(id, monthName) {
    if(typeof id !== "undefined") {
        var url = `/admin/dates/${id}`,
            xhr = new XMLHttpRequest();     // the XHR class instace creation
        
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                document.getElementsByClassName("dates")[0].style.display = "block";
                document.getElementById("nameMonth").innerHTML = monthName + " месяц";
                document.getElementById("tableDates").innerHTML = json.docs;
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(null);
    } else {
        return null;
    }
}