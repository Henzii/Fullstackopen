/* eslint-disable no-undef */
describe('Blog app', function () {

    beforeEach( function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            user: 'tester',
            password: 'tester',
            name: 'Test User'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Kirjaudu sisään')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('tester')
            cy.get('#password').type('tester')
            cy.get('#loginButton').click()
            cy.contains('Logged in as tester')
        })
        it('fails with wrong credentials', function () {
            cy.get('#username').type('tester')
            cy.get('#password').type('abcde')
            cy.get('#loginButton').click()
            cy.get('.error').should('contain', 'Väärä tunnus tai salasana')
                .and('have.css', 'background-color', 'rgb(255, 182, 193)')
                .and('have.css', 'border', '2px solid rgb(255, 0, 0)')
        })
    })
    describe('When logged in', function () {
        beforeEach( function () {

            cy.visit('http://localhost:3000')
            cy.get('#username').type('tester')
            cy.get('#password').type('tester')
            cy.get('#loginButton').click()
        })
        it('A blog can be created', function () {
            cy.get('button').contains('Add blog').click()
            cy.get('#title').type('Test title')
            cy.get('#author').type('Tester Cypress')
            cy.get('#url').type('tester.google.com')
            cy.get('button').contains('Create').click()

            cy.get('.message').should('contain', 'Blogi Test title lisätty!')
                .and('have.css', 'background-color', 'rgb(144, 238, 144)')
            cy.contains('Test title')

        })
        it('Blog can be liked', function () {

            cy.addBlog({ title: 'Like me', author: 'Tester', url: 'www.com' })

            cy.contains('Like me').parent().find('button').contains('Show').as('ButtOn')
            cy.get('@ButtOn').click()
            cy.get('@ButtOn').parent().find('button').contains('Like').click()
            cy.contains('Likes: 1')
        })
        it('Blog can be removed', function () {

            cy.addBlog({ title: 'Kill me', author: 'Tester', url: 'www.com' })
            cy.contains('Kill me').parent().as('Isukki')
            cy.get('@Isukki').find('button').contains('Show').click()
            cy.get('@Isukki').find('button').contains('poista').click()
            cy.get('html').should('not.contain', 'Kill me')
        })
        it('Blogs come in orderly fashion', function () {
            cy.addBlog({ title: 'Blog 1', author: 'Tester', url: 'www.com' })
            cy.addBlog({ title: 'Blog 2', author: 'Tester', url: 'www.com' })
            cy.addBlog({ title: 'Blog 3', author: 'Tester', url: 'www.com' })
            cy.visit('http://localhost:3000')
            cy.contains('Blog 2').as('Blog2')
            cy.contains('Blog 3').as('Blog3')

            cy.get('@Blog2').find('button').contains('Show').click()
            cy.get('@Blog3').find('button').contains('Show').click()

            cy.get('@Blog3').find('button').contains('Like').click()
            cy.get('@Blog2').find('button').contains('Like').click()
            cy.get('@Blog3').find('button').contains('Like').click()
            cy.visit('http://localhost:3000')

            cy.get('.blogi:first').contains('Blog 3')
            cy.get('.blogi:last').contains('Blog 1')

        })
    })

})