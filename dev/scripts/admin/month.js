console.log("Hello, admin");

document.getElementById("submitCreateMonth").addEventListener("click", function(e) {
    e.preventDefault();
    
    let form = document.querySelector("select"),
        id_year = document.getElementById("tableMonth").getAttribute("value"),
        month = {
            number: form.selectedIndex,
            title: form.options[form.selectedIndex].label
        };

    if(month.number >= 1 && month.number <= 12) {
        let url = "/admin/month",
            data = JSON.stringify({ id_year, month }),
            xhr = new XMLHttpRequest();     // the XHR class instace creation

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            let json = JSON.parse(xhr.response);

            if(xhr.readyState == 4 && xhr.status == 200) {
                form.selectedIndex = 0;
                console.log(json.docs);
            } else {
                console.log(json.msg);
            }
        });

        xhr.send(data);
    } else {
        M.toast({html: 'Неправильное значение поля: "Выберите месяц"'});
    }
});