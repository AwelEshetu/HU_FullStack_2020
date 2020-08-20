import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text,handleClick}) =><button onClick={handleClick}>{text}</button>;
const States= ({text,count}) => <p>{text} {count}</p>;
const Feedback =({text,good,neutral,bad}) =>{

 const stat= text==='all' ? `${good-bad}` : text==='average' ? `${(good-bad)/(good+bad+neutral)}` : `${(good / (good+bad+neutral)) * 100 }%`;

  return (<p>{text} {(bad+good+neutral) !==0 ? stat : null} </p>)
      
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  
  const handleGood= () => {
    return setGood(good+1);
  }
  const handleNeutral= () => {
    return setNeutral(neutral+1);
  }
  const handleBad= () => {
    return setBad(bad+1);
  }

  

  return (
    <div>
      <h1>Give Feedback</h1>
      <div style={{display:'inline-block'}}>
      <Button text='good' handleClick={handleGood}/>
      <Button text='neutral' handleClick={handleNeutral}/>
      <Button text='bad' handleClick={handleBad}/>
      </div> 
      <h1>Statistics</h1>
      <div>
        <States text='good' count={good}/>
        <States text='neutral' count={neutral}/>
        <States text='bad' count={bad}/>
        <Feedback text='all' good={good} neutral={neutral} bad={bad} />
        <Feedback text='average'  good={good} neutral={neutral} bad={bad} />
        <Feedback text='positive'  good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)