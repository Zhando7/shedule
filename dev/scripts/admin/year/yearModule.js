function YearModule() {
    var ServerController = {
        errors: [],
        initXHR: function(reqType, url) {
            if(reqType, url) {
                var xhr = new XMLHttpRequest();     // the XHR class instance creation
                xhr.open(reqType, url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                return xhr;   
            } else {
                this.failure("", "Ошибка запроса! Переданы не все аргументы.");
            }
        },
        postRequest: function(url, data) {
            if(url && data) {
                let xhr = this.initXHR("POST", url);

                xhr.addEventListener("load", function () {
                    // receive and parse the server response 
                    var json = JSON.parse(xhr.response);

                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareCreateYear(json.docs);
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));

                xhr.send(data);
            }
        },
        getRequest: function(url) {
            if(url) {
                let xhr = this.initXHR("GET", url);

                xhr.addEventListener("load", function() {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
        
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareGetYear(json.docs);
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));
        
                xhr.send(null);
            }
        },
        putRequest: function(url, data) {
            if(url && data) {
                let xhr = this.initXHR("PUT", url);
                data = JSON.stringify(data);

                xhr.addEventListener("load", function() {
                    var json = JSON.parse(xhr.response);
                    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareEditYear(JSON.parse(data));
                    } else {
                        this.failure("Server error:", json.msg);
                    }
                }.bind(this));

                xhr.send(data);
            }
        },
        deleteRequest: function(url, idYear) {
            if(url) {
                let xhr = this.initXHR("DELETE", url);

                xhr.addEventListener("load", function () {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
                        
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareDeleteYear(idYear);
                    } else {
                        this.failure("Server error: ", json.msg)
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

    var YearController = {
        getCreateFormValue: function(formName) {
            if(formName) {
                var form = document.forms[formName];
                return form.elements["year"].value;
            } else {
                this.failure("", "Не найдена форма с указанным идентификатором!");
            }
        },
        getEditFormValue: function(formName) {
            if(formName) {
                var form = document.forms[formName];
                return {
                    _id: form.getAttribute("attribIdYear"),
                    year: form.getAttribute("attribYear")
                }
            }
        },
        clearInput() {
            var form;
            if(form = document.forms["createForm"]){
                form.elements["year"].value = "";
            }
        },
        createYear: function() {
            var year;
            if(year = this.getCreateFormValue("createForm")) {
                if(year < 2020 || year > 3000) {
                    this.failure("", "Ошибка! Пожалуйста, введите другой год!");
                } else {
                    let url = "/admin/year",
                        data = JSON.stringify({ year });

                    this.postRequest(url, data);
                }
            } else {
                this.failure("", "Ошибка! Пожалуйста, введите год!");
            }
        },
        prepareCreateYear: function(docs) {
            if(docs) {
                this.clearInput();
                this.addRowToTable("tableYear", docs);
            } else {
                this.failure("Server error: ", "Had not gotten data from server!");
            }
        },
        getYear: function(idYear, year) {
            if(idYear && year) {
               let form = document.forms["editForm"];
               form.setAttribute("attribIdYear", idYear);
               form.setAttribute("attribYear", year);
               form[0].value = year;

               this.showEditForm(true);  // to show the `editForm` HTML element to the selected year
            }
        },
        editYear: function() {
            var attribs;
            if(attribs = this.getEditFormValue("editForm")) {
                let anotherYear = document.forms["editForm"][0].value;

                if(!anotherYear) {
                    this.failure("", "Ошибка сохранения! Пожалуйста, укажите год!");
                } else if(anotherYear === attribs.year) {
                    this.showEditForm();
                } else if(anotherYear < 2020 || anotherYear > 3000) {
                    this.failure("", "Пожалуйста, введите другой год!");
                } else {
                    attribs.year = anotherYear;
                    let url = "/admin/year";
                    this.putRequest(url, attribs);
                }
            }
        },
        prepareEditYear: function(docs) {
            if(docs) {
                document.getElementById(`editBtn_${docs._id}`).setAttribute("onclick", `year.getYear('${docs._id}', '${docs.year}')`);
                this.showEditForm(false, docs._id, docs.year);
            } else {
                this.failure("Server error: ", "Had not gotten data from server!");
            }
        },
        deleteYear: function(idYear) {
            if(idYear) {
                let url = `/admin/year/${idYear}`;
                this.deleteRequest(url, idYear);
            }
        },
        prepareDeleteYear: function(idYear) {
            if(idYear) {
                document.getElementById(`tr__${idYear}`).remove();
            }
        },
        addRowToTable: function(idDomElem, docs) {
            if(idDomElem && docs) {
                var table = document.getElementById(idDomElem),
                    row = table.insertRow(table.length);
            
                // the created row is filling with cells
                var cellId = row.insertCell(0),
                    cellYear = row.insertCell(1),
                    cellOperation = row.insertCell(2);

                // setting the required attributes
                row.setAttribute("id", `tr__${docs._id}`);
                cellId.setAttribute("class", "hide-on-small-only")
                cellYear.setAttribute("id", `td__${docs._id}`);

                // the cells are filling with entered values
                cellId.innerHTML = `${docs._id}`;
                cellYear.innerHTML = `<a href="/admin/month/${docs._id}">${docs.year}</a>`;
                cellOperation.innerHTML = this.initOperationsFields(docs);
            }
        },
        initOperationsFields: function(docs) {
            if(docs) {
                var { _id, year} = docs,
                opEdit = `<a id="editBtn_${_id}" onclick="year.getYear('${_id}', '${year}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
                opDelete = `<a id="deleteBtn_${_id}" onclick="year.deleteYear('${_id}')" class="removeLink waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
                op = opEdit + " " + opDelete;
            
                return op;
            }
        },
        showEditForm: function(bool, idYear = undefined, year = undefined) {
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
                    document.getElementById(`td__${idYear}`).innerHTML = `<a href="/admin/month/${idYear}">${year}</a>`;
                    break;
                }
                default: {
                    editForm[0].style.display = "none";
                    displayRowYear("block");
                }
            }
        }
    }

    Object.setPrototypeOf(YearController, ServerController);
    return YearController;
}

var year = Object.create(YearModule());

document.getElementById("submitCreateYear").addEventListener("click", function (e) {
    e.preventDefault();
    year.createYear();
});

document.getElementById("submitEditYear").addEventListener("click", function(e) {
    e.preventDefault();
    year.editYear();
});