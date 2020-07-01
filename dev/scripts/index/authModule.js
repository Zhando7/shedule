function AuthorizationModule() {
    var LoginController = {
        errors: [],
        getUser: function() {
            var form = document.forms["loginForm"];
            return form.elements["user_name"].value;
        },
        getPassword: function() {
            var form = document.forms["loginForm"];
            return form.elements["user_pass"].value;
        },
        validateEntry: function(user, pw) {
            user = user || this.getUser();
            pw = pw || this.getPassword();
    
            if(user.length == 0 && pw.length == 0) {
                return this.failure("Ошибка авторизации! ", "Пожалуйста, введите логин и пароль!");
            } else if(pw.length < 5) {
                return this.failure("Ошибка авторизации! ", "Пароль должен содержать больше 5 символов!");
            }
    
            return true;
        },
        failure: function(title, err) {
            this.errors.push(err);
            this.showDialog(title, err);
        },
        showDialog: function(title, msg) {
            M.toast({ html: title + msg });
        }
    }
    
    var AuthController = {
        checkAuth: function() {
            var name = this.getUser(),
                password = this.getPassword();
    
            if(this.validateEntry(name, password)) {
                let data = JSON.stringify({ name, password });
                this.server("/login", data);
            }
        },
        server: function(url, data) {
            var xhr = new XMLHttpRequest();
    
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.addEventListener("load", function() {
                var json = JSON.parse(xhr.response);
    
                if(xhr.readyState == 4 && xhr.status == 200) {
                    this.accepted();
                } else {
                    this.failure("Ошибка аутентификации! ", json.msg);
                }
            }.bind(this));
    
            xhr.send(data);
        },
        accepted: function() {
            location.replace(document.baseURI + "admin");
            this.showDialog("Аутентификация", " прошла успешно!");
        }
    }
    
    Object.setPrototypeOf(AuthController, LoginController);
    return AuthController;
}

var user = Object.create(AuthorizationModule());

document.getElementById("submitLogin").addEventListener("click", function(e) {
    e.preventDefault();
    user.checkAuth();
});