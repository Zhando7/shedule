function MonthModule() {
    var ServerController = {
        errors: [],
        initXHR: function(type, url) {
            if(type, url) {
                var xhr = new XMLHttpRequest();
                xhr.open(type, url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                return xhr;
            } else {
                this.failure("", "Ошибка запроса! Переданы не все аргументы.");
            }
        },
        postRequest: function(url, data) {
            if(url && data) {
                let xhr = this.initXHR("POST", url);

                xhr.addEventListener("load", function() {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
                    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareCreateMonth(json.docs);
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));
        
                xhr.send(data);
            }
        },
        getRequest: function(url, nameMonth) {
            if(url) {
                let xhr = this.initXHR("GET", url);

                xhr.addEventListener("load", function() {
                    var json = JSON.parse(xhr.response);
        
                    if(xhr.readyState == 4 && xhr.status == 200) {
                       this.prepareGetDatesOfMonth(json.docs, nameMonth);
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));
                
                xhr.send(null);
            }
        },
        deleteRequest: function(url, idMonth) {
            if(url && idMonth) {
                let xhr = this.initXHR("DELETE", url);

                xhr.addEventListener("load", function () {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
                        
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareDeleteMonth(idMonth);
                    } else {
                        this.failure("Server error:", json.msg);
                    }
                }.bind(this));
        
                xhr.send(null);
            }
        },
        failure: function(title, err) {
            this.errors.push(err);
            this.showDialog(title, err);
        },
        showDialog: function(title, msg) {
            (title) ? console.log(title, msg) : M.toast({ html: msg });
        }
    };

    var MonthController = {
        createMonth: function() {
            var form = document.querySelector("select"),
                id_year = document.getElementById("tableMonth").getAttribute("value"),
                month = {
                    number: form.selectedIndex,
                    title: form.options[form.selectedIndex].label
                };
            
            if(month.number >= 1 && month.number <= 12) {
                let url = "/admin/month",
                    data = JSON.stringify({ id_year, month });

                this.postRequest(url, data);
            } else {
                this.failure('Неправильное значение поля: "Выберите месяц"');
            }
        },
        prepareCreateMonth: function(docs) {
            if(docs) {
                document.querySelector("select").selectedIndex = 0;
                this.addRowToTable("tableMonth", docs);
            }
        },
        deleteMonth: function(idMonth) {
            if(idMonth) {
                let url = `/admin/month/${idMonth}`;
                this.deleteRequest(url, idMonth);
            }
        },
        prepareDeleteMonth: function(idMonth) {
            if(idMonth) {
                document.getElementById(`tr__${idMonth}`).remove();
                document.getElementsByClassName("dates")[0].style.display = "none";
            }
        },
        getDatesOfMonth: function(idMonth, nameMonth) {
            if(idMonth && nameMonth) {
                let url = `/admin/dates/${idMonth}`;
                this.getRequest(url, nameMonth);
            }
        },
        prepareGetDatesOfMonth: function(docs, nameMonth) {
            if(docs) {
                document.getElementsByClassName("dates")[0].style.display = "block";
                document.getElementById("nameMonth").innerHTML = nameMonth + " месяц";
                document.getElementById("tableDates").innerHTML = docs;
            }
        },
        addRowToTable: function(idDomElem, docs) {
            if(idDomElem && docs) {
                var table = document.getElementById(idDomElem),
                    row = table.insertRow(table.length);
                
                // filling the created row with cells
                var cellId = row.insertCell(0),
                    cellMonth = row.insertCell(1),
                    cellOperation = row.insertCell(2);
        
                // setting the required attributes
                row.setAttribute("id", `tr__${docs._id}`);
                cellId.setAttribute("class", "hide-on-small-only")
                cellMonth.setAttribute("onclick", `month.getDatesOfMonth("${docs._id}", "${docs.month.title}")`);
        
                // filling the cells with the entered values
                cellId.innerHTML = `${docs._id}`;
                cellMonth.innerHTML = `${docs.month.title}`;
                cellOperation.innerHTML = `<a onclick="month.deleteMonth('${docs._id}')" class="waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`;
            }
        }
    };

    Object.setPrototypeOf(MonthController, ServerController);
    return MonthController;
}

var month = Object.create(MonthModule());

document.getElementById("submitCreateMonth").addEventListener("click", function(e) {
    e.preventDefault();

    month.createMonth();
});