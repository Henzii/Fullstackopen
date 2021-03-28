const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {

    return blogs.reduce((a, b) => {
        return a + b.likes
    },0)

}
const favoriteBlog  = (blogs) => {
    
    var paras = {}
    blogs.forEach((blogi => {
        if (!paras.likes || blogi.likes > paras.likes) paras = blogi
    }))
    return paras
}
const mostLikes = (blogs) => {
    var bloggers = [{}]
    var mostB = { likes: 0 }
    const findAuthorBlog = (auth) => {
        var blogger = bloggers.find(blogi => blogi.author === auth)
        if (!blogger) blogger = { author: auth, likes: 0 }
        
        bloggers = bloggers.concat(blogger)
        return blogger
    }

    blogs.forEach( blogi => {
        const tmpBlogger = findAuthorBlog(blogi.author)
        tmpBlogger.likes += blogi.likes
        if (tmpBlogger.likes > mostB.likes) mostB = tmpBlogger
    })
    return mostB
}
const mostBlogs = (blogs) => {
    
    var bloggers = [{}]
    var mostB = { blogs: 0 }
    const findAuthorBlog = (auth) => {
        var blogger = bloggers.find(blogi => blogi.author === auth)
        if (!blogger) blogger = { author: auth, blogs: 0 }
        
        bloggers = bloggers.concat(blogger)
        return blogger
    }

    blogs.forEach( blogi => {
        const tmpBlogger = findAuthorBlog(blogi.author)
        tmpBlogger.blogs++
        if (tmpBlogger.blogs > mostB.blogs) mostB = tmpBlogger
    })
    return mostB
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}