const Blog = require('../models/blogmodel')
const User = require('../models/usermodel')
const router = require('express').Router()

router.post('/reset', async (req, res) => {
    console.log('Database reset...')
    await Blog.deleteMany({})
    await User.deleteMany({})
    res.status(204).end()
})

module.exports = router