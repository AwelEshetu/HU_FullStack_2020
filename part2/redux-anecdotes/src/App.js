import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/AnecdoteForm'
const App = () => {
  
 

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <Anecdote />
    </div>
  )
}

export default App