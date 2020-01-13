module.exports = (req, res, next) => {
    if(!req.session.userId) {
        res.send('You are not admin!');
    } else {
        next();
    }
}