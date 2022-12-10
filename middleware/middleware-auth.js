const jwebtoken = require('jsonwebtoken')

const generateAccessToken = (id) => {
    return jwebtoken.sign({ id }, process.env.JWT_AUTH, {
        expiresIn: '1d'
    })
}

const auth = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            const decodedAccessToken = jwebtoken.verify(accessToken, process.env.JWT_AUTH)
            next()
        } catch {
            res.status(401).json()
        }
    } else {
        res.status(401).json()
    }
}

module.exports = { generateAccessToken, auth }