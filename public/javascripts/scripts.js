console.log('hello');

// (
//     function onLoad() {
//         let request = new XMLHttpRequest();
//         let d = new Date();

//         // Сериализуем данные в json
//         let currentDate = JSON.stringify({
//             month: String(d.getMonth()),
//             year: String(d.getFullYear())
//         });
        
//         // Посылаем запрос на адрес `/`
//         request.open('GET', `/lessons`, true);
//         request.setRequestHeader('Content-Type', 'application/json');
//         request.addEventListener('load', function() {
//             // Получаем и парсим ответ сервера
//             let receivedData = JSON.parse(request.response);
//             console.log(receivedData.month, '.', receivedData.year);
//         });
//         request.send(currentDate);
//     }
// )();