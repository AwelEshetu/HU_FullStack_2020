import React ,{useState} from 'react'

const BlogForm = ({addBlog}) => {
    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle= (event) =>{
      setTitle(event.target.value);
    }
    
    const handleAuthor= (event) =>{
      setAuthor(event.target.value);
    }
    
    const handleUrl= (event) =>{
      setUrl(event.target.value);
    }

    const createBlog = (event) => {
      event.preventDefault();
      addBlog({
        title: title,
        author: author,
        url: url
      });
      
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
        /></div>
        <div >author:
        <input
          value={author}
          onChange={handleAuthor}
        /></div>
        <div >url:
        <input
          value={url}
          onChange={handleUrl}
        /></div>
        <button type="submit">create</button>
      </form>
      </div>
    )
}

  export default BlogForm