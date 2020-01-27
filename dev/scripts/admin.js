document.getElementById("submitDay").addEventListener("click", function (e) {
    e.preventDefault();
   // получаем данные формы
   let formCreateDay = document.forms["formCreateDay"];
   let idMonth = "5e2e7beece8076145c58b3e2";
   let fullDate = formCreateDay.elements["full_date"].value;
   
   // сериализуем данные в json
   let data = JSON.stringify({ id_month: idMonth, full_date: fullDate });

   let xhr = new XMLHttpRequest();
   // посылаем запрос на адрес "/login"
   xhr.open("POST", "/admin/day", true);   
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.addEventListener("load", function () {
       // получаем и парсим ответ сервера
        let received = JSON.parse(xhr.response);
        console.log(received.msg);
    });
    xhr.send(data);
});