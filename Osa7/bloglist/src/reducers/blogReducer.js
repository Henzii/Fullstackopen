
const blogReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_BLOGS':
        return action.data
    case 'ADD_BLOG':
        console.log(action.data.blog)
        return [...state, action.data.blog ]
    case 'LIKE_BLOG':
        return state.map(b => (b.id !== action.data.id) ? b : { ...b, likes: b.likes + 1 })
    case 'DELETE_BLOG':
        return state.filter(b => (b.id !== action.data.id ))
    default:
        return state
    }
}
export const deleteBlog = (id) => {
    return {
        type: 'DELETE_BLOG',
        data: {
            id,
        }
    }
}
export const likeBlog = (id) => {
    return {
        type: 'LIKE_BLOG',
        data: {
            id
        }
    }
}
export const createBlog = (blog) => {
    return {
        type: 'ADD_BLOG',
        data: {
            blog,
        }
    }
}
export const initBlogs = (data) => {
    return {
        type: 'INIT_BLOGS',
        data,
    }
}

export default blogReducer