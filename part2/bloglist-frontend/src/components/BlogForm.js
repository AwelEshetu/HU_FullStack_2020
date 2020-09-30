import React from 'react'

const BlogForm = (blogProps,  
    handleTitle,
    handleAuthor,
    handleUrl,
   ) => {
    
    console.log('blog props',blogProps)

    return(
        <div>
        <h3>create new</h3>
        <form onSubmit={blogProps.addBlog}>
        <div>title:
        <input
          value={blogProps.title}
          onChange={blogProps.handleTitle}
        /></div>
        <div >author:
        <input
          value={blogProps.author}
          onChange={blogProps.handleAuthor}
        /></div>
        <div >url:
        <input
          value={blogProps.url}
          onChange={blogProps.handleUrl}
        /></div>
        <button type="submit">create</button>
      </form>
      </div>
    )
}

  export default BlogForm