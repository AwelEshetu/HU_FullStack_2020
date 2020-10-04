import React ,{ useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle= (event) => {
    setTitle(event.target.value)
  }

  const handleAuthor= (event) => {
    setAuthor(event.target.value)
  }

  const handleUrl= (event) => {
    setUrl(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h3>create new</h3>
      <form onSubmit={createBlog}>
        <div>title:
          <input
            value={title}
            onChange={handleTitle}
            id='title'
          /></div>
        <div >author:
          <input
            id="blog-author"
            value={author}
            onChange={handleAuthor}
          /></div>
        <div >url:
          <input
            id="blog-url"
            value={url}
            onChange={handleUrl}
          /></div>
        <button id="create-blog" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes={
  addBlog:PropTypes.func.isRequired
}

export default BlogForm