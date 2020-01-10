console.log('Hello');

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
   // получаем данные формы
   let loginForm = document.forms["loginForm"];
   let userName = loginForm.elements["userName"].value;
   let userPassword = loginForm.elements["userPassword"].value;

   // сериализуем данные в json
   let user = JSON.stringify({name: userName, password: userPassword});

   let xhr = new XMLHttpRequest();
   // посылаем запрос на адрес "/login"
   xhr.open("POST", "/auth/login", true);   
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.addEventListener("load", function () {
       // получаем и парсим ответ сервера
        let received = JSON.parse(xhr.response);
        console.log(received.msg);
    });
    xhr.send(user);
});

function logout() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/auth/logout", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function () {
        let received = JSON.parse(xhr.response);
        console.log(received.msg);
    });
    xhr.send();
}