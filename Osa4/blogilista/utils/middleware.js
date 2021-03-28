const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    req.token = null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        req.token = auth.substring(7)
    }
    next()
}
const userExtractor = (req, res, next) => {
    req.user = {}
    if (req.token)  {
        const decTok = jwt.verify(req.token, process.env.SECRET)
        const user = {
            user: decTok.user,
            id: decTok.id
        }
        req.user = user
    }
    next()
}
const puhuja = (req, res, next) => {
    console.log(req.method + ' ' + req.path + '| user: ' + ( (!req.user.id) ? 'No token' : req.user.user + ' (' + req.user.id + ')' ))
    next()
}
const errorHandler = (error, req, res, next) => {

    if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }

    next(error)
}

module.exports = {
    tokenExtractor,
    errorHandler,
    userExtractor,
    puhuja
}