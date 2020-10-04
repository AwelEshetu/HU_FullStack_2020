import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin({
      username : username,
      password : password
    })

    setUsername('')
    setPassword('')
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  return( <form onSubmit={login}>
    <div>
        username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsername}
      />
    </div>
    <div>
        password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePassword}
      />
    </div>
    <button id="login-button" type="submit">login</button>
  </form>
  )
}

LoginForm.propTypes = {
  handleLogin:PropTypes.func.isRequired
}

export default LoginForm