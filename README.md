# Расписание занятии для студентов

Это простой проект разработанный на Node.js, Express.js и MongoDB.\
Для просмотра нажмите [сюда](http://innovation-center.herokuapp.com/).

## Содержимое

1. [Необходимые программы](#необходимые-программы)
    * [Установка Node.js](#установка-nodejs)
    * [Установка Git](#установка-git)
    * [Установка MongoDB](#установка-mongodb)
2. [Запуск проекта](#запуск-проекта)
3. [Структура](#структура)

## Необходимые программы

Нормальный запуск проекта обеспечивают:
* **Node.js** - программная платформа выполняющая код на JavaScript;
* **Git** - распределённая система управления версиями проекта;
* **MongoDB** - система управления базами данных;
* **npm** - менеджер пакетов, входящий в состав *Node.js* (т.е. он автоматический установиться вместе с Node.js).

#### Установка Node.js 

Для загрузки перейдите на официальный сайт [*https://nodejs.org/en/*](https://nodejs.org/en/). На главной странице из двух возможных опций выберите: LTS (версия с долгосрочной поддержкой).

![Downloading Node.js](https://metanit.com/web/nodejs/pics/1.1.png)

С завершением загрузки, запустите программу-установщик:

![Installing Node.js](https://metanit.com/web/nodejs/pics/1.2.png)

Для проверки успешной установки Node.js, введите в командной строке: `node -v`. Вам должна отобразиться текущая версия:
```
$ node -v
v12.14.1
```

#### Установка Git

Перейдите на официальный сайт [*https://git-scm.com/download/win*](https://git-scm.com/download/win), и выберите необходимую сборку для загрузки. После установки введите в командной строке `git version`. Вам должна отобразиться текущая версия:
```
$ git version
git version 2.26.0.windows.1
```

#### Установка MongoDB

Для загрузки перейдите на официальный сайт [*https://www.mongodb.com/download-center/community*](https://www.mongodb.com/download-center/community).

Официальный сайт предоставляет пакеты дистрибутивов для платформ: Windows, Linux. Есть два вида серверов - Community и Enterprise. В данном случае надо установить версию Community. Enterprise-версия обладает расширенными возможностями, и доступна только в триальном режиме или по подписке.

Для операционной системы Windows выберите тип пакета *"ZIP"*:

![Downloading MongoDB](https://metanit.com/nosql/mongodb/pics/1.6.png)

После загрузки ZIP пакета распакуем его в папку "*C:\mongodb*."

![Unpacking files](https://metanit.com/nosql/mongodb/pics/1.1.png)

#### Создание каталога для хранения БД

В ОС Windows по умолчанию MongoDB хранит базы данных по пути "*C:\data\db*", поэтому создайте соответствующие каталоги. В ОС Linux и MacOS каталогами по умолчанию будет "*/data/db*". Если же возникла необходимость использовать какой-то другой путь к файлам, то его можно передать при запуске MongoDB во флаге `--dbpath`.

#### Запуск MongoDB

Сервером является приложение *mongod.exe*, которое находится в папке "*C:\mongodb\bin*". Для его запуска введите в командной строке:
```
$ cd C:\mongodb\bin
$ mongod
```
Командная строка отобразит нам ряд служебной информации:

![Launch MongoDB](https://metanit.com/nosql/mongodb/pics/1.2.png)

Теперь после удачного запуска сервера мы сможем начать работать с проектом.

## Запуск проекта

Для запуска этого проекта, установите его локально используя *git* в командной строке:
```
$ git clone https://github.com/Zhando7/shedule.git
```

Затем установите необходимые библиотеки проекта:
```
$ cd shedule    // войти в директорию с проектом
$ npm install
```

Процесс установки библиотек займет некоторое время. Затем, в корневой директорий проекта переименуйте файл "*.env.example*" на "*.env*", и запустите проект через командную строку:
```
$ npm start
```

Для просмотра результата, перейдите в браузере на [*http://localhost:3000/*](http://localhost:3000/)

## Структура

Организованна на [MVC-паттерне](https://ru.wikipedia.org/wiki/Model-View-Controller).

![App structure](https://i.ibb.co/BcG0H9S/app-structure.png)

+ **/config** - папка с конфигурационным файлом;
+ **/controllers** - выполнение бизнес-логики на стороне *сервера*:
    + /admin - CRUD-операции администратора:
        + /date/index.js 
        + /lesson/index.js 
        + /month/index.js 
        + /year/index.js 
    + index.js - обработчик запросов на стороне сервера
+ **/dev** - выполнение бизнес-логики на стороне *клиента*:
    + /admin - CRUD-операции администратора:
        + date.js
        + lesson.js
        + month.js
        + year.js
    + main.js - обработчик запросов на стороне клиента
+ **/middleware** - промежуточные компоненты;
+ **/models** - модели баз данных:
    + /shedule - расписание;
    + /user - администратор;
+ **/public** - папка статических активов (CSS, клиентский код JavaScript) передаваемых клиенту;
+ **/routes** - обработчик запросов http:
```
// routes/admin.js

const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/admin');

adminRouter.post('/month', adminController.month.createMonth);
adminRouter.get('/month/:id', adminController.month.getMonth);
adminRouter.put('/month', adminController.month.updateMonth);
adminRouter.delete('/month/:id', adminController.month.deleteMonth);
...
```
+ **/utils** - здесь хранятся переиспользуемые утилиты:
    + servers.js - обработка тела запросов, отправка обработанных результатов или ошибок в ответ клиенту;
    + calendar.js - создание календаря;
    + mongoose.js - подключение к БД.
+ **/views** - шаблоны, используемые для генерирования страниц;
+ **.env** - содержит настройки окружения проекта;
```
#Environment prod || dev
NODE_ENV=prod

#Port
PORT=3000

#DataBase
MONGO_URL=mongodb://localhost:27017/
```
+ **app.js** - файл подготовки приложения, сюда идет весь основной код:
```
const express = require('express'),
    app = express(),
    conf = require('./config'),
    middleware = require('./middleware')(app, express);

app.listen(conf.PORT, () => {
    console.log(`Express server listening on port:${conf.PORT}`)
});
```
+ **gulpfile.js** - транспилирует JavaScript файлы из */dev* в */public*
+ **package.json** - файл со списком зависимостей и командой запуска приложения;