import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (user) => {
    token = `bearer ${user.token}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const deleteBlog = async (blog) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    return await axios.delete(`${baseUrl}/${blog.id}`, config)
}
const addBlog = async (blog) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const vastaus = await axios.post(baseUrl, blog, config)
    return vastaus.data
}
const likeBlog = async (blog) => {
//    const uid = (blog.user) ? blog.user.id : 'User missing'
    const updatedBlog = {
        ...blog,
        likes: blog.likes+1,
    }
    const vastaus = await axios
        .put(`${baseUrl}/${blog.id}`, updatedBlog)
    return vastaus.data

}
const exportit = {
    getAll,
    addBlog,
    setToken,
    likeBlog,
    deleteBlog
}
export default exportit