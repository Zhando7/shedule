module.exports = (req, res, next) => {
    if(!!req.session.userId) {
        next();
    } else {
        res.status(403).json({
            msg: "You are not admin!"
        });
    }
}