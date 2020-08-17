import React from 'react'
import ReactDOM from 'react-dom'

const Header= (props) => {
 return (
   <h1> {props.course}</h1>
 );
}

const Content = (props) => {
  //console.log(`props from content `+ JSON.stringify(props))
 return (
   <>
   <Part parts={props.parts} />
   </>
 );
}


const Total = (props) =>{
 // console.log(`props from total `+ JSON.stringify(props))
  let total=props.parts.map(part=>part.exercises).reduce((a,b)=>a+b);
  return (
    <p>Number of exercises {total}</p>
  );
}

const Part = (props) =>props.parts.map((part,index)=><p key={index}>{part.name} {part.exercises}</p>);

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))