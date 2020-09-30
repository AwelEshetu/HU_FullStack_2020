import React from 'react'

const LoginForm = (loginProps) => {
   
   return( <form onSubmit={loginProps.handleLogin}>
      <div>
        username
          <input
          type="text"
          value={loginProps.username}
          name="Username"
          onChange={({ target }) => loginProps.setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={loginProps.password}
          name="Password"
          onChange={({ target }) => loginProps.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 
   )     
}

export default LoginForm