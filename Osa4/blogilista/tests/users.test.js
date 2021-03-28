const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const blogiListaMonta = require('./test_helper').blogiListaMonta
const mongoose = require('mongoose')
const Blog = require('../models/blogmodel')

describe('Käyttiin liittyvät testit', () => {
    var addedUser= {}
    test('Lisää käyttäjä', async () => {
        const newUser = {
            name: 'Tester123',
            user: 'tester123',
            password: 'topsecret'
        }
        const vastaus = await api.post('/api/users')
            .send(newUser)
            .expect(200)
        addedUser = vastaus.body
        console.log(addedUser)
    })
    test('Poistetaan käyttäjä', async () => {
        await api.delete(`/api/users/${addedUser.id}`)
            .expect(202)
    })
    afterAll( () => {
        mongoose.connection.close()
    })

})