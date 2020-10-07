import anecdoteService from '../services/anecdotes'



export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdotes,
    })
  }
}

export const vote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(n=>n.id===id)
    await anecdoteService.update(id,{...anecdoteToChange,votes:anecdoteToChange.votes+1})
    dispatch({
        type: 'VOTE' ,
        data: { id }
    })
  }
}


export const filter=(query)=>{
    return {
        type: 'FILTER',
        data:{query}
    }
}

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

    switch(action.type) {
        case 'NEW_ANECDOTE':
            return [...state,action.data]
        case 'INIT_ANECDOTES' :
            return action.data
        case 'VOTE':

          const id = action.data.id
          const anecdoteToChange = state.find(n => n.id === id)
          const changedAnecdote = { 
            ...anecdoteToChange, 
            votes:anecdoteToChange.votes+1
          }
          return state.map(anecdote =>
            anecdote.id !== id ? anecdote : changedAnecdote 
          )
        case 'FILTER':
            const query = action.data.query.toLowerCase()  
            const filteredAnecdote = state.filter(anecdote=>anecdote.content.toLowerCase().includes(query)) 
          return  filteredAnecdote     
        default:
            return state
    }
}

export default anecdoteReducer