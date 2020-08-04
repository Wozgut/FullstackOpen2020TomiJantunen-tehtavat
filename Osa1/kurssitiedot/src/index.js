import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <h1>
      {props.coursename}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part partname={props.parts[0].name} partexercises={props.parts[0].exercises}  />
      <Part partname={props.parts[1].name} partexercises={props.parts[1].exercises}  />
      <Part partname={props.parts[2].name} partexercises={props.parts[2].exercises}  />
    </div>
  )
}

const Part = (props) => {
  return (
      
      <p>{props.partname} {props.partexercises}</p>
  )
}


const Total = (props) => {
  return (
      <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises} </p>
  )
}




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
      <Header coursename={course.name} /> 
      <Content parts={course.parts} />  
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))