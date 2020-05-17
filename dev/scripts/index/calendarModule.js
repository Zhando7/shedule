function CalendarModule() {
    var ServerController = {
        errors: [],
        server: function(url, trigger) {
            if(url) {
                let xhr = new XMLHttpRequest();
                
                xhr.open("GET", url, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.addEventListener("load", function() {
                    var json = JSON.parse(xhr.response);

                    if(xhr.readyState == 4 && xhr.status == 200) {
                        if(trigger === 1) {
                            this.prepareRequestMonth(json.docs);
                        } else if(trigger === 2) {
                            this.prepareRequestLessons(json.docs);
                        }
                    } else {
                        this.failure("Server error: ", json.msg);
                    }
                }.bind(this));
                xhr.send(null);
            }
        },
        failure: function(title, err) {
            this.errors.push(err);
            (title) ? console.log(err) : this.showDialog(title, err);
        },
        showDialog(title, msg) {
            M.toast({ html: title + msg });
        },
    };

    var MonthController = {
        init: function(idDomElement) {
            this.idDomElement = idDomElement;
        },
        requestMonth: function(idDomElement, idMonth) {
            if(idDomElement && idMonth) {
                let url = `/view/dates/${idMonth}`;
                if(!this.idDomElement) {
                    this.init(idDomElement);
                }
                this.server(url, 1);
            }
        },
        prepareRequestMonth: function(docs) {
            if(docs) {
                this.showCalendar(docs);
            }
        },
        showCalendar: function(docs) {
            document.getElementById("tableLessons").style.display = "none";

            var table = '<table class="striped centered"><thead><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th></tr></thead><tbody><tr>',
                firstDay = new Date(docs[0].full_date).getDay(),
                j = 0;
            
            /*
            * Пробелы для первого ряда
            * с понедельника до первого дня месяца
            */
            for( let i = 1; i < firstDay; i++ ) {
                table += '<td></td>';
            }

            // <td> ячейки календаря с датами
            while( j < docs.length ) {
                if( new Date(docs[j].full_date).getDay() != 0 ) {
                    table += this.initMonthCell(docs, j);
                }
                
                if( new Date(docs[j].full_date).getDay() == 6 && j < ( docs.length - 1)) {
                    table += "</tr><tr>";   // новый ряд
                }
                
                j++;
            }

            table += "</tr></tbody></table>";
            document.getElementById(`${this.idDomElement}`).innerHTML = table;
            document.getElementById(`${this.idDomElement}`).style.display = "block";
        },
        initMonthCell: function(docs, i) {
            var attribId = `id="${docs[i]._id}"`,
                attribOnClick = `onclick="getLessons('${docs[i]._id}')"`,
                dateValue = new Date(docs[i].full_date).getDate(),
                cell = `<td ${attribId} ${attribOnClick}>${dateValue}</td>`;

            return cell;
        }
    }

    var LessonController = {
        requestLessons: function(idDate) {
            if(idDate && typeof idDate === "string") {
                let url = `/view/lessons/${idDate}`;
                this.server(url, 2);
            }
        },
        prepareRequestLessons: function(docs) {
            if(docs.length > 0) {
                this.showTableLessons(docs);
            } else {
                document.getElementById("tableLessons").style.display = "none";
                this.failure("", "Уроков на эту дату не имеется");
            }
        },
        showTableLessons: function(docs) {
            if(docs) {
                var table = document.getElementById("tableLessons"),
                    start = `
                        <table class="striped centered">
                        <thead>
                            <tr>
                                <th>Время</th>
                                <th>Название</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>  
                    `,
                    end = `</tbody></table>`,
                    i = 0;
                
                while(i < docs.length) {
                    start += `
                        <tr>
                            <td>${docs[i].time_start} - ${docs[i].time_end}</td>
                            <td>${docs[i].title}</td>
                            <td>${docs[i].desc}</td>
                        </tr>
                    `
                    i++;
                }
                table.style.display = "block";
                table.innerHTML = start + end;
            }
        }
    }

    Object.setPrototypeOf(LessonController, ServerController);
    Object.setPrototypeOf(MonthController, LessonController);

    return MonthController;
}

var calendar = Object.create(CalendarModule());

function findSelectMonth(idDomElement, idMonth) {
    calendar.requestMonth(idDomElement, idMonth);
}

function getLessons(idDate) {
    calendar.requestLessons(idDate);
}