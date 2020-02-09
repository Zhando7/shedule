module.exports = (req, res, next) => {
    if(!req.session.userId) {
        res.status(400).json({
            msg: "You are not admin!"
        })
    } else {
        next();
    }
}