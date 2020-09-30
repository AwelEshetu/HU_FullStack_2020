import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [isError,setIsError]=useState(true)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const user = await loginService.login({
          username, password,
        })
        
        //set user to local storage
        window.localStorage.setItem(        
          'loggedblogappUser', JSON.stringify(user)      
          )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  const handleLogout= (event) => {
    event.preventDefault();
     //clear local storage
    window.localStorage.removeItem('loggedblogappUser')
     blogService.setToken(null)
     setUser(null)
   
  }

const handleTitle= (event) =>{
  event.preventDefault();
  setTitle(event.target.value);
}

const handleAuthor= (event) =>{
  event.preventDefault();
  setAuthor(event.target.value);
}

const handleUrl= (event) =>{
  event.preventDefault();
  setUrl(event.target.value);
}

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try{
      const blog= await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))

      setTitle('')
      setAuthor('')
      setUrl('')
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
    const loginProps={
      username,
      setUsername,
      password,
      setPassword,
      handleLogin
    }

  const notificationProps={
    errorMessage,
    isError
  }

  const blogProps={
      addBlog,
      handleUrl,
      handleTitle,
      handleAuthor,
      title,
      url,
      author,    
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notificationProps} />
      
      {
      user===null ? 
      <LoginForm {...loginProps} />:
      <>
      <div>
      <p>{user.name} logged-in <button onClick = {handleLogout}>logout</button></p>
      <BlogForm {...blogProps} />
      {blogs.map(blog =><Blog key={blog.id} blog={blog} />)} 
      </div>
      </>
      }  
    </div>
  )
}

export default App