import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value 
    event.target.anecdote.value = ''
    if(content.length > 0 ){
      props.createAnecdote(content)
      props.setNotification(`You created anecdote "${content}"`, 5)
    }else{
      props.setNotification(`Anecdote content missing`, 5)
    }
    
    
  }

  return (
      <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
      </>
  )
}
const mapDispatchToProps = {
    createAnecdote,
    setNotification, 
    clearNotification
}
export default connect(null,mapDispatchToProps)(AnecdoteForm)