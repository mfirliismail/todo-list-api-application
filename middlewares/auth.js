const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const bearerToken = req.header("Authorization")
    try {

        const token = bearerToken.replace("Bearer ", "")
        const decode = jwt.verify(token, "passwordKey")
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "failed",
            message: "Internal Server Error"
        })
    }
}