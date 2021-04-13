import React from 'react'
import { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

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
                    <TextField label="Title" type="text" variant="standard" onChange={(t) => setTitle(t.target.value)} value={title} id='title'/>
                </div>
                <div>
                    <TextField label="Author" type="text" variant="standard" onChange={(t) => setAuthor(t.target.value)} value={author} id='author' />
                </div>
                <div>
                    <TextField label="URL" variant="standard" type="text" onChange={(t) => setUrl(t.target.value)} value={url} id='url' />
                </div>
                <div>
                    <Button type="submit" id="addBlogButton" variant="contained">Create</Button>
                </div>
            </form>
        </>
    )
}


export default AddBlog