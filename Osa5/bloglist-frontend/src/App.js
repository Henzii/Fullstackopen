import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState({})

    const addBlogRef = useRef()

    const notify = (msg, type) => {
        setNotification({ msg, type })
        setTimeout( () => {
            setNotification({ msg: null, type: null })
        }, 5000)
    }

    const handleAddBlog = async (title, author, url) => {
        const uusiBlogi = { title, author, url }
        try {
            const vastaus = await blogService.addBlog(uusiBlogi)
            notify(`Blogi ${uusiBlogi.title} lisätty!`, 'message')
            setBlogs(blogs.concat(vastaus))
        } catch(error) {
            notify('Blogin lisääminen ei onnistunut', 'error')
        }
        addBlogRef.current.toggleVis()
    }
    const handleDeleteBlog = async (blog) => {
        //    console.log('poista')
        if (!user.id || !blog.user) return
        if (blog.user.id === user.id) {
            if (!window.confirm(`Oletko varma että ${blog.title} poistetaan?`)) {
                return
            }
        } else return
        try {
            await blogService.deleteBlog(blog)
            const newKidsOnTheBlogs = blogs.filter(b => (b.id !== blog.id))
            setBlogs(newKidsOnTheBlogs)
            notify('Heihei blogi!', 'message')
        } catch(error) {
            notify('Blogin poisto ei onnistunut :(', 'error')
        }
    }
    const handleLikeBlog = async (blog) => {
        try {
            const vastaus = await blogService.likeBlog(blog)
            console.log(vastaus)
            const uuBlogs = blogs.map(b => (b.id === vastaus.id) ? vastaus : b)
            setBlogs(uuBlogs)

            notify('Liketetty! :)', 'message')
        } catch(error) {
            notify('Liken antaminen ei onnistunut :(', 'error')
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(`Loggin in ${userName}, ${password}`)
        try {
            const vastaus = await loginService.login({ user: userName, password: password })
            setUser(vastaus)
            blogService.setToken(vastaus)
            window.localStorage.setItem('LoggedIn', JSON.stringify(vastaus))
        } catch(error) {
            notify('Väärä tunnus tai salasana', 'error')
        }
        setUserName('')
        setPassword('')
    }
    useEffect(() => {
        const JSONlogin = window.localStorage.getItem('LoggedIn')
        if (JSONlogin) {
            const ussr = JSON.parse(JSONlogin)
            setUser(ussr)
            blogService.setToken(ussr)
        }
    }, [])
    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs = blogs.map(b => {
                if (!b.user) return { ...b, user: { id: 0 } }
                return b
            })
            blogs = blogs.sort( (eka,toka) => (toka.likes - eka.likes))
            setBlogs( blogs )
        })
    }, [])

    const logout = () => {
        window.localStorage.clear()
        setUser(null)
    }


    const loginform = () => { return (
        <Loginform setUserName={setUserName} setPassword={setPassword} handleLogin={handleLogin}/>
    )}
    const loggedin = () => { return (
        <>
            <p>Logged in as {user.user} | {user.id} <button onClick={logout}>Logout</button></p>
            <Togglable buttonLabel='Add blog' ref={addBlogRef}>
                <AddBlog addNewBlog={handleAddBlog}/>
            </Togglable>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    handleLikeBlog={handleLikeBlog}
                    handleDeleteBlog={handleDeleteBlog}
                    user={user}
                />
            )}
        </>
    )}

    return (
        <div>
            <Notification msg={notification} />
            { (user === null) ? loginform() : loggedin() }
        </div>
    )
}

export default App