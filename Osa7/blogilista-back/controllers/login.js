const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/usermodel')

loginRouter.post('/', async (req, res) => {

    const user = await User.findOne( { user:req.body.user })
    const pwOikein = (!user) ? false : await bcrypt.compare(req.body.password, user.passwordHash )
    if (!pwOikein || !user) {
        return res.status(401).send({ error: 'Väärä tunnus'})
    }

    const user4Token = {
        user: user.user,
        id: user._id
    }

    const token = await jwt.sign(user4Token, process.env.SECRET)

    res.status(200).send ( {token: token, user: user.user, id: user._id })

})

module.exports = loginRouter