function LessonModule() {
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
                var xhr = this.initXHR("POST", url);

                xhr.addEventListener("load", function() {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
                    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareLessonCreate(json.docs);
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));

                xhr.send(data);
            }
        },
        getRequest: function(url) {
            if(url) {
                var xhr = this.initXHR("GET", url);

                xhr.addEventListener("load", function() {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
                    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareLessonSelect(json.docs);
                    } else {
                        this.failure("Server error: ", json.msg)
                    }
                }.bind(this));
        
                xhr.send(null);
            }
        },
        putRequest: function(url, data) {
            if(url && data) {
                var xhr = this.initXHR("PUT", url);

                xhr.addEventListener("load", function() {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
                    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareEditLesson(JSON.parse(data));
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));

                xhr.send(data);
            }
        },
        deleteRequest: function(url, idLesson) {
            if(url && idLesson) {
                var xhr = this.initXHR("DELETE", url);

                xhr.addEventListener("load", function() {
                    // receive and parse the server response
                    var json = JSON.parse(xhr.response);
        
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        this.prepareLessonDelete(idLesson);
                    } else {
                        this.failure("Server error: ", json.msg);
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

    var LessonController = {
        checkInputs: function(id, st, end, title, desc) {
            if(!(id && st && end && title && desc)) {
                this.failure("","Ошибка создания! Заполните все поля.");
            } else if(title.length <= 3 && desc.length <= 3) {
                this.failure("", "Название и описание должны содержать больше 3 символов!");
            } else {
                return true;
            }
        },
        lessonCreate: function() {
            var id_date = document.getElementById("tableLesson").getAttribute("value"),
                timePicker = document.forms["createForm"].querySelectorAll(".timepicker"),
                time_start = timePicker[0].value,
                time_end = timePicker[1].value,
                title = document.getElementById("titleCreate").value,
                desc = document.getElementById("descCreate").value;

            if(this.checkInputs(id_date, time_start, time_end, title, desc)) {
                let url = "/admin/lesson",
                    data = JSON.stringify({ id_date, time_start, time_end, title, desc });
                
                this.postRequest(url, data);
            }
        },
        prepareLessonCreate: function(docs) {
            if(docs) {
                this.clearCreateFormInputs();
                this.addRowToTable(docs);
            }
        },
        lessonSelect: function(idLesson) {
            if(idLesson) {
                var url = `/admin/lesson/select/${idLesson}`;
                this.getRequest(url);
            }
        },
        prepareLessonSelect: function(docs) {
            this.triggerForm(true);  // to show the `editForm` HTML element of selected date
            /*
            * to set the attribute and value of the `editForm` HTML element
            */
            document.forms["editForm"].setAttribute("value", docs._id);
        },
        lessonEdit: function() {
            var _id = document.forms["editForm"].getAttribute("value"),
                timePicker = document.forms["editForm"].querySelectorAll(".timepicker"),
                time_start = timePicker[0].value,
                time_end = timePicker[1].value,
                title = document.getElementById("titleEdit").value,
                desc = document.getElementById("descEdit").value;

            if(this.checkInputs(_id, time_start, time_end, title, desc)) {
                let url = "/admin/lesson",
                    data = JSON.stringify({ _id, time_start, time_end, title, desc });
                
                this.putRequest(url, data);
            }
        },
        prepareEditLesson: function(docs) {
            if(docs) {
                this.triggerForm(false, docs._id, docs);
            }
        },
        lessonDelete: function(idLesson) {
            if(idLesson) {
                var url = `/admin/lesson/${idLesson}`;
                this.deleteRequest(url, idLesson);
            }
        },
        prepareLessonDelete: function(idLesson) {
            document.getElementById(`tr__${idLesson}`).remove();
        },
        clearCreateFormInputs: function() {
            var timePicker = document.forms["createForm"].querySelectorAll(".timepicker");
            timePicker[0].value = "";
            timePicker[1].value = "";
            document.getElementById("titleCreate").value = "";
            document.getElementById("descCreate").value = "";
        },
        addRowToTable: function(docs) {
            if(docs) {
                var table = document.getElementById("tableLesson"),
                    row = table.insertRow(table.length);
        
                // filling the created row with cells
                var cellTime = row.insertCell(0),
                    cellTitle = row.insertCell(1),
                    cellDesc = row.insertCell(2),
                    cellOperation = row.insertCell(3);
                
                // setting the required attributes
                row.setAttribute("id", `tr__${docs._id}`);
                cellTime.setAttribute("id", `time__${docs._id}`);
                cellTitle.setAttribute("id", `title__${docs._id}`);
                cellDesc.setAttribute("id", `desc__${docs._id}`);
        
                // filling the cells with entered values
                cellTime.innerHTML = `${docs.time_start} - ${docs.time_end}`;
                cellTitle.innerHTML = docs.title;
                cellDesc.innerHTML = docs.desc;
                cellOperation.innerHTML = this.getOperation(docs);
            }
        },
        getOperation: function(docs) {
            if(docs) {
                var { _id } = docs,
                    opEdit = `<a onclick="lesson.lessonSelect('${_id}')" class="waves-effect waves-light btn"><i class="editLink small material-icons">edit</i></a>`,
                    opDelete = `<a onclick="lesson.lessonDelete('${_id}')" class="waves-effect waves-light btn"><i class="small material-icons">delete</i></a>`,
                    op = opEdit + " " + opDelete;
                return op;
            }
        },
        triggerForm: function(bool, idLesson = undefined, docs = undefined) {
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
                    document.getElementById(`time__${idLesson}`).innerHTML = docs.time_start + " - " + docs.time_end;
                    document.getElementById(`title__${idLesson}`).innerHTML = docs.title;
                    document.getElementById(`desc__${idLesson}`).innerHTML = docs.desc;
                    break;
                }
                default: {
                    editForm[0].style.display = "none";
                    displayRowLesson("block");
                }
            }
        }
    };

    Object.setPrototypeOf(LessonController, ServerController);
    return LessonController;
}

var lesson = Object.create(LessonModule());

document.getElementById("submitCreateLesson").addEventListener("click", function (e) {
    e.preventDefault();
    lesson.lessonCreate();
});

document.getElementById("submitEditLesson").addEventListener("click", function (e) {
    e.preventDefault();
    lesson.lessonEdit();
});