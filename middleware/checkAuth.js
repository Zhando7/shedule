module.exports = (req, res, next) => {
    if(!req.session.userId) {
        res.status(401).json({
            msg: 'You unauthorized!'
        });
    } else {
        next();
    }
}