
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/usermodel')

usersRouter.post('/', async (req, res) => {
    const body = req.body
    
    if (!body.user || !body.password || body.password.length < 3) {
        return res.status(401).end()
    }

    const passwordHash = await bcrypt.hash(body.password, 10)
    
    const newUser = new User({
        user: body.user,
        name: body.name,
        passwordHash
    })
    const tulos = await newUser.save()
    res.status(201).json(tulos.toJSON())
})
usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    res.json(users.map(u => u.toJSON()))
})
usersRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.status(202).end()
})

module.exports = usersRouter