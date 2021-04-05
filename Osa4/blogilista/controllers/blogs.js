
const Blog = require('../models/blogmodel')
const User = require('../models/usermodel')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { user: 1, name: 1, id: 1 })
    response.json(blogs)
})
blogsRouter.put('/:id', async (request, response) => {

    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const upattu = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { user: 1, name: 1, id: 1 })
    response.json(upattu)
})
blogsRouter.delete('/:id', async (request, response) => {

    const id = request.params.id
    const blogi = await Blog.findById(id)
    console.log(request.user.id)
    if (!request.user.id || ! blogi.user) {
        return response.status(401).end()
    }
    if (request.user.id.toString() !== blogi.user.toString()) {
        return response.status(401).end()
    }

    await blogi.remove()
    response.status(204).end()
})
blogsRouter.post('/', async (request, response) => {

    if (!request.user.id) {
        return response.status(401).end()
    }
    const user = await User.findById(request.user.id)

    if (!request.body.url || !request.body.title) {
        return response.status(400).end()
    }

    if (!request.body.likes) {
        request.body.likes = 0
    }
    const blog = new Blog({
        ...request.body,
        user: user
    })
    const result = await blog.save()
    await user.save()
    response.status(201).json(result.toJSON())
})

module.exports = blogsRouter