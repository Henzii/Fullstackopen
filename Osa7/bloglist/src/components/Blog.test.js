import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blogi renderöityy pelkän titlen kanssa', () => {

    let component
    const blog = {
        title: 'Testiotsikko',
        author: 'Testaaja',
        likes: 666,
        url:'testing.com',
        user: {
            id: '12345'
        }
    }
    const user = {
        id: 'testingID',

    }
    const mockHandler = jest.fn()

    beforeEach( () => {
        component = render(
            <Blog blog={blog} user={user} handleLikeBlog={mockHandler} />
        )
    })

    test('Title löytyy...', () => {
        expect(component.container).toHaveTextContent('Testiotsikko')
    })

    test('Author, Likes ja Url ei renderöidy', () => {
        expect(component.container).not.toHaveTextContent('testing.com')
        expect(component.container).not.toHaveTextContent('Likes:')
        expect(component.container).not.toHaveTextContent('Testaaja')
    })
    test('Napin painallus näyttää muut tiedot', () => {
        const nappi = component.getByText('Show')
        fireEvent.click(nappi)
        expect(component.container).toHaveTextContent('Likes')
        expect(component.container).toHaveTextContent('Testaaja')
    })
    test('Like-napin painallus laukaisee tapahtumakäsittelijän', async () => {
        const nappi = component.getByText('Show')
        fireEvent.click(nappi)

        const likeNappi = component.getByText('Like')

        fireEvent.click(likeNappi)
        fireEvent.click(likeNappi)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
