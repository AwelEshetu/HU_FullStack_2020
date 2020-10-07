import React from 'react'
import { connect } from 'react-redux'

import {vote} from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList=(props)=>{
   
    const handleClick= (anecdote)=>{
        props.vote(anecdote.id)
        props.setNotification(`You voted for anecdote "${anecdote.content}"`, 5)
    }
   return(
       <>
      {props.anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
            {anecdote.content}
          <div>
            has {anecdote.votes}
            <button onClick={()=>handleClick(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </>
    ) 
}

const anecdotesToShow=({anecdotes})=>{
    
    return anecdotes.sort((prev,curr)=>curr.votes-prev.votes)
}

const mapDispatchToProps = {
    vote,
    setNotification,
    clearNotification
}

const mapStateToProps = (state) => {
  return {
      anecdotesToShow:anecdotesToShow(state),
      anecdotes:state.anecdotes
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)