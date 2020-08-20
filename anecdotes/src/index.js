import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button= ({text, handleClick}) => <button onClick={handleClick}> {text}</button>
const MostSelectedAnecdote = ({anecdote}) => {
  //console.log('most voted is called with ', anecdote)
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdote}
    </div>
     
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted,setMostVoted] = useState(anecdotes[0])
  
  const selectNext= ()=>{
     let nextAnecdote= Math.floor(Math.random()*(anecdotes.length));
      setSelected(nextAnecdote);
  }

  const handleVote= ()=>{
     let votesArray=[...votes];
         votesArray[selected] += 1;
      setVotes ([...votesArray])
      setMostVoted(anecdotes[votesArray.findIndex((i)=>i === Math.max(...votesArray))])
  }

  //console.log('votes ',votes)
  //console.log('index ', selected)
  //console.log('most voted ', mostVoted)
 
  return (
    <div>
      <h1>Anecdote of the day </h1>
      {props.anecdotes[selected]}
      <p>{`has ${votes[selected]} ${votes[selected] > 1 ? 'votes' :'vote'}` }</p>
      <div style={{display:'inline-block'}}>
      <Button text='vote' handleClick={handleVote} />
      <Button text='next anecdote' handleClick={selectNext} />
      </div>
      <MostSelectedAnecdote anecdote={mostVoted} />
     </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
