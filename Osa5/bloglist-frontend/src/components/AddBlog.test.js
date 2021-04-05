import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from './AddBlog'

test('<AddBlog> kutsuu e-handlea oikeilla tiedoilla', () => {

    const mockHandler = jest.fn()

    const component = render(
        <AddBlog addNewBlog={mockHandler} />
    )
    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

    fireEvent.change(inputTitle, { target: { value: 'TestingTitle' } })
    fireEvent.change(inputAuthor, { target: { value: 'TestingAuthor' } })
    fireEvent.change(inputUrl, { target: { value: 'TestingUrl' } })

    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0]).toContain('TestingTitle')
    expect(mockHandler.mock.calls[0]).toContain('TestingAuthor')
    expect(mockHandler.mock.calls[0]).toContain('TestingUrl')

})