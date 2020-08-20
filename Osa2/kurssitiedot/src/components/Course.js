import React from 'react'



const Course = ({course}) => {
    return (
      <div>
        <Header coursename={course.name} /> 
        <Content parts={course.parts} />  
        <Total parts={course.parts}/>
      </div>
    )
  }


//Below are the components needed by Course

const Header = (props) => {
    return (
      <h2>
        {props.coursename}
      </h2>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part =>
           <Part key={part.id} partname={part.name} partexercises={part.exercises}  />
           )}
       
      </div>
    )
  }
  
  const Part = (props) => {
    return (
        
        <p>{props.partname} {props.partexercises}</p>
    )
  }
  
  
  const Total = (props) => {
    const total=props.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises, 
      0
    )
    
    return (
        <p><b>total of {total} excercises</b></p>
        
    )
  }
  
export default Course