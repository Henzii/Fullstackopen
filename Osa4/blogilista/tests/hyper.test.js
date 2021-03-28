const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const blogiListaMonta = require('./test_helper').blogiListaMonta
const mongoose = require('mongoose')
const Blog = require('../models/blogmodel')

var token = null

beforeEach( async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogiListaMonta)
})
beforeAll( async () => {
    
    const loginDetails = {
        user: 'Tester999',
        name: 'No name',
        password: 'jokuSalasanaMikäVaan',
    }

    const vastaus = await api.post('/api/login')
        .send(loginDetails)
        .expect(200)
    token = 'bearer ' + vastaus.body.token


})
describe('Blogitestejä', () => {

    test('Data JSONina', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('Oikea määrä dataa', async () => {
        const data = await api.get('/api/blogs')
        expect(data.body).toHaveLength(blogiListaMonta.length)
    })
    test('Kaikilla on ID-kenttä', async () => {
        const data = await api.get('/api/blogs')
        data.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
    test('Blogin lisäys onnistuu', async () => {
        const uusiBlogi = {
            title: 'TestiBlogi',
            author: 'Jester Tester',
            url: 'google.com',
            likes: '0'
        }
        await api.post('/api/blogs')
            .set( { Authorization: token })
            .send(uusiBlogi)
            .expect(201)
        const data = await api.get('/api/blogs')
        expect(data.body).toHaveLength((blogiListaMonta.length+1))
    })
    test('Blogin ilman likeja on nolla', async () => {
        const uusiBlogi = {
            title: 'Testi ilman likeja',
            author: 'Jester Tester',
            url: 'google.com'
        }
        const sentBlog = await api.post('/api/blogs')
            .set( { Authorization: token })
            .send(uusiBlogi)
        expect(sentBlog.body.likes).toBe(0)
    })
    test('Ilman titleä ja urlia, vastaus on 400', async () => {
        const uusiBlogi = {
            author: 'Jester Tester',
            likes: 666
        }
        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(uusiBlogi)
            .expect(400)
    })
    test('Blogin lisäys ilman tokenia on 401', async () => {
        await api.post('/api/blogs')
            .send( { author: 'TEsti blogi', url: 'ajsdlkajsdlakda', title: 'fsdfsdfsdfsfs'})
            .expect(401)
    })
    test('Blogin muutos onnistuu', async () => {
        const muutettava = blogiListaMonta[0]
        muutettava.likes = 666
        const palautus = await api.put(`/api/blogs/${muutettava._id}`)
            .send(muutettava)
            .expect(200)

        expect(palautus.body.likes).toBe(666)
        
    })
})

afterAll( () => {
    mongoose.connection.close()
})