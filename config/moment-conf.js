const moment = require('moment');

moment.updateLocale('ru', {
    months: [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ]
});

module.exports = moment;