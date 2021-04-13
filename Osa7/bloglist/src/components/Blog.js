import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { TextField, Button, List, ListItem } from '@material-ui/core'

const Blog = () => {

    const id = useParams().id
    const user = useSelector(state => state.user)
    const [blog, setBlog] = useState(null)

    useEffect( () => {
        blogService.getBlog(id).then(res => setBlog(res))
    }, [])

    const dispatch = useDispatch()
    const notify = (msg, type) => {
        dispatch(createNotification(msg, type))
    }
    const handleDeleteBlog = async () => {
        //    console.log('poista')
        if (!user.id || !blog.user) return
        if (blog.user.id === user.id) {
            if (!window.confirm(`Oletko varma että ${blog.title} poistetaan?`)) {
                return
            }
        } else return
        try {
            await blogService.deleteBlog(blog)
            dispatch(deleteBlog(blog.id))
            notify('Heihei blogi!', 'message')
        } catch (error) {
            notify('Blogin poisto ei onnistunut :(', 'error')
        }
    }
    const handleLikeBlog = async () => {
        try {
            const vastaus = await blogService.likeBlog(blog)
            dispatch(likeBlog(vastaus.id))
            setBlog({ ...blog, likes: blog.likes+1 })
            notify('Liketetty! :)', 'success')
        } catch (error) {
            notify('Liken antaminen ei onnistunut :(', 'error')
        }
    }
    const handleComment = async (e) => {
        e.preventDefault()
        try {
            const res = await blogService.commentBlog(id, e.target.kommentti.value)
            setBlog(res)
            notify('Blogia kommentoitu!', 'message')
        } catch( error) {
            notify('Jostain syystä kommentin antaminen ei onnistunut', 'error')
        }
        e.target.kommentti.value=''
    }
    if (!blog) return null
    return (
        <div>
            <h1>{blog.title} by <i>{blog.author}</i></h1>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>{blog.likes} likes, <Button size="small" variant="outlined" onClick={handleLikeBlog}>Liketä</Button></p>
            <p>Added by {blog.user.name}</p>
            {(blog.user.id === user.id && <Button size="small" variant="outlined" onClick={handleDeleteBlog}>Poista</Button>) }
            <h2>Kommentit</h2>
            <form onSubmit={handleComment}>
                <TextField size="small" name="kommentti" variant="outlined" label="Anna kommmentti" /> <Button type="submit" variant="contained">Kommentoi</Button>
            </form>
            <List>
                {blog.comments.map((c,i) => <ListItem divider={true} key={c+i}>{c}</ListItem> )}
            </List>
        </div>
    )
}

export default Blog