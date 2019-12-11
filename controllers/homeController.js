const moment = require('moment');

exports.getIndex = (req ,res) => {
    const currentDate = {
        month: moment().format('M'),
        year: moment().format('Y')
    };
    
    console.log(currentDate);
    res.render('index');
}