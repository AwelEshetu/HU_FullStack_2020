import React from 'react'
import {  useDispatch } from 'react-redux'
import {createNew} from '../reducers/anecdoteReducer'

const Anecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        //console.log('anecdote here ', anecdote)
        event.target.anecdote.value = ''
        dispatch(createNew(anecdote))
     }
    return (

        <div>
            <h2>create new</h2>
            <form onSubmit ={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default Anecdote