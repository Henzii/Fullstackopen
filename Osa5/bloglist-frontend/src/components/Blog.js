import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog, user }) => {

    const [opened, setOpened] = useState(false)

    const seasamOpen = () => {
        setOpened( !opened )
    }
    const poistaNappi = () => {
        return (
            <>
                <button onClick={() => handleDeleteBlog(blog)}>poista</button>
            </>
        )
    }
    const blogInfo = () => {
        return (
            <div>
                {blog.url} <br />
        Likes: {blog.likes} <button onClick={() => handleLikeBlog(blog)}>Like</button><br />
                {blog.author}<br />
                {(blog.user.id === user.id && poistaNappi())}
            </div>
        )
    }
    return (
        <div className='blogi'>
            {blog.title} <button onClick={seasamOpen}>{(opened) ? 'Hide' : 'Show'}</button>
            { (opened) ? blogInfo() : '' }
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired

}

export default Blog