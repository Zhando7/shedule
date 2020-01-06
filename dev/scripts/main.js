console.log('Hello');

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
   // получаем данные формы
   let loginForm = document.forms["loginForm"];
   let userName = loginForm.elements["userName"].value;
   let userPassword = loginForm.elements["userPassword"].value;
   console.log(userName, userPassword);
   // сериализуем данные в json
   let user = JSON.stringify({userName: userName, userPassword: userPassword});

   let xhr = new XMLHttpRequest();
   // посылаем запрос на адрес "/login"
   xhr.open("POST", "/login", true);   
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.addEventListener("load", function () {
       // получаем и парсим ответ сервера
        let received = JSON.parse(xhr.response);
        // console.log(receivedUser.userName, "-", receivedUser.userPassword);   // смотрим ответ сервера
        console.log(received.message);
    });
    xhr.send(user);
});