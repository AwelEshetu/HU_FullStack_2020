import React, { useState, useEffect ,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [isError,setIsError]=useState(true)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      //set user to local storage
      window.localStorage.setItem(
        'loggedblogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout= (event) => {
    event.preventDefault()
    //clear local storage
    window.localStorage.removeItem('loggedblogappUser')
    blogService.setToken(null)
    setUser(null)

  }

  const addBlog = async ( blogObject ) => {

    blogFormRef.current.toggleVisibility()

    try{
      const blog= await blogService.create(blogObject)

      setBlogs(blogs.concat(blog))
      setIsError(false)
      setErrorMessage(`a new Blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(expection){
      setIsError(true)
      setErrorMessage('Invalid data')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleLikes = async (id) => {

    const blogToLike = blogs.find(b => b.id === id)
    const blogToUpdate = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }

    try{

      await blogService.update(id,blogToUpdate)
      setBlogs(blogs.map(blog => blog.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : blog))
      setIsError(false)
      setErrorMessage(`a Blog ${blogToUpdate.title} by ${blogToUpdate.author} has been updated`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(expection){
      setIsError(true)
      setErrorMessage('Invalid data')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id ) => {
    const blog=blogs.find(blog => blog.id===id)

    const isRemove = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if(isRemove){

      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !==id))

    }
  }

  const notificationProps={
    errorMessage,
    isError
  }

  const blogFormRef= useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notificationProps} />

      {
        user===null ?
          <Togglable buttonLabel='login' >
            <LoginForm handleLogin={handleLogin} />
          </Togglable>
          :
          <div>
            <p>{user.name} logged-in <button onClick = {handleLogout}>logout</button></p>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm addBlog={addBlog} />
            </Togglable>
            { blogs.sort((prev,cur) => cur.likes - prev.likes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLikes={() => handleLikes(blog.id)}
                handleRemove={() => handleRemove(blog.id)}
                ownBlog={user.username===blog.user.username}/>
            )}
          </div>
      }
    </div>
  )
}

export default App