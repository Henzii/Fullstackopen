import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import Users from './components/Users'
import User from './components/User'

import { Switch, Link, Route } from 'react-router-dom'
import { createNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import { AppBar, IconButton, Button, Toolbar, Paper } from '@material-ui/core'

const App = () => {

    const dispatch = useDispatch()
    const blogit = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const addBlogRef = useRef()

    const notify = (msg, type) => {
        dispatch(createNotification(msg, type))
    }

    const handleAddBlog = async (title, author, url) => {
        const uusiBlogi = { title, author, url, likes: 0 }
        try {
            const vastaus = await blogService.addBlog(uusiBlogi)
            notify(`Blogi ${uusiBlogi.title} lisätty!`, 'successnpm ')
            dispatch(createBlog(vastaus))
        } catch (error) {
            notify('Blogin lisääminen ei onnistunut', 'error')
        }
        addBlogRef.current.toggleVis()
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(`Loggin in ${userName}, ${password}`)
        try {
            const vastaus = await loginService.login({ user: userName, password: password })
            dispatch(setUser(vastaus.user, vastaus.id))
            blogService.setToken(vastaus)
            window.localStorage.setItem('LoggedIn', JSON.stringify(vastaus))
        } catch (error) {
            notify('Väärä tunnus tai salasana', 'error')
        }
        setUserName('')
        setPassword('')
    }
    useEffect(() => {
        const JSONlogin = window.localStorage.getItem('LoggedIn')
        if (JSONlogin) {
            const ussr = JSON.parse(JSONlogin)
            console.log('Kirjautunut: ', ussr)
            dispatch(setUser(ussr.user, ussr.id))
            blogService.setToken(ussr)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs => {
            dispatch(initBlogs(blogs))
        })
    }, [])

    const logout = () => {
        window.localStorage.clear()
        dispatch(setUser('', ''))
    }

    if (user === null || user.user === '') return (
        <>
            <Notification />
            <Loginform setUserName={setUserName} setPassword={setPassword} handleLogin={handleLogin} />
        </>
    )

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="primary" aria-label="menu">
                    </IconButton>
                    <Button component={Link} to ="/" color="inherit">Home</Button>
                    <Button component={Link} to="/users/" color="inherit">Users</Button>
                </Toolbar>
            </AppBar>
            <p></p>
            <span>Logged in as {user.user} <Button size="small" onClick={logout} variant="contained" color="inherit">Logout</Button></span>

            <Notification />

            <Switch>
                <Route path="/users/:id">
                    <User/>
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/blogs/:id">
                    <Blog />
                </Route>
                <Route path="/">
                    <Togglable buttonLabel='Add blog' ref={addBlogRef}>
                        <AddBlog addNewBlog={handleAddBlog} />
                    </Togglable>
                    <h2>Blogs</h2>
                    {blogit.map(blog =>
                        <OneBlog blog={blog} key={blog.id} />
                    )}
                </Route>
            </Switch>

        </>

    )
}
const OneBlog = ({ blog }) => {
    const toLink = `/blogs/${blog.id}`
    return (
        <Link to={toLink}><Paper elevation={3} style={{ padding: 10, margin: 10 }}>{blog.title}</Paper></Link>
    )

}
export default App