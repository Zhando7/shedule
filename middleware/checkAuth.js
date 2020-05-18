module.exports = (req, res, next) => {
    if(!req.session.userId) {
        res.status(403).json({
            msg: "You are not admin!"
        });
    } else {
        next();
    }
}