import React ,{ useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog ,handleLikes,handleRemove,ownBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle={
    borderRadius:1,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    backgroundColor:'blue'
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return (
    <div style={blogStyle} >

      {blog.title} {blog.author} <button onClick={() => toggleVisibility()}>{visible ? 'hide' : 'view'}</button>
      <div style={{ display:`${visible ? '':'none'}` }} className="detail">

        <div> {blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={() => handleLikes(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {ownBlog&&<button style={buttonStyle} onClick={() => handleRemove(blog.id)}>remove</button>}

      </div>

    </div>

  )}

Blog.propTypes = {
  blog : PropTypes.object.isRequired,
  handleLikes : PropTypes.func.isRequired,
  handleRemove : PropTypes.func.isRequired,
  ownBlog : PropTypes.bool.isRequired
}

export default Blog
