import React from 'react'
import { useState } from 'react'

const AddBlog = ({ addNewBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleAddClick = (e) => {
        e.preventDefault()
        addNewBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <>
            <h2>Add blog</h2>
            <form onSubmit={handleAddClick}>
                <div>
               Title:<input type="text" onChange={(t) => setTitle(t.target.value)} value={title} id='title'/>
                </div>
                <div>
               Author:<input type="text" onChange={(t) => setAuthor(t.target.value)} value={author} id='author' />
                </div>
                <div>
               URL:<input type="text" onChange={(t) => setUrl(t.target.value)} value={url} id='url' />
                </div>
                <div>
                    <button type="submit" id="addBlogButton">Create</button>
                </div>
            </form>
        </>
    )
}


export default AddBlog