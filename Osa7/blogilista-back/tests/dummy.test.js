const dummy = require('../utils/list_helper').dummy
const sumLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes
const blogiListaMonta = require('./test_helper').blogiListaMonta


test('Dummy returns one', () => {

    const blogs = []

    const tulos = dummy(blogs)
    expect(tulos).toBe(1)

})

describe('Total likes', () => {

    const blogiLista = [
        {
            title: 'Otsikko',
            likes: 3

        }
    ]
    
    test('Tyhjän listan tykkäykset', () => {
        expect( sumLikes([])).toBe(0)
    })
    test('Yhden blogin tykkäykset', () => {
        expect( sumLikes(blogiLista)).toBe(3)
    })
    test('Monen blogin tykkäykset', () => {
        expect( sumLikes(blogiListaMonta)).toBe(36)
    })
   
})

describe('Tähdelliset testit', () => {
    test('Eniten tykkäyksiä', () => {
        expect( favoriteBlog(blogiListaMonta)).toEqual(blogiListaMonta[2])
    })
    test('Eniten blogeja', () => {
        expect( mostBlogs(blogiListaMonta)).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
    test('Eniten tykkäyksiä', () => {
        expect( mostLikes(blogiListaMonta)).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
    })
})