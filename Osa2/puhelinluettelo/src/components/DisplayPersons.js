import React from 'react'

const DisplayPersons = ({persons, handleDelClick}) => {
  
    return (
        <div>{persons.name} {persons.number}
        <button onClick={handleDelClick}>delete</button>
        </div>
     )
  }
    








export default DisplayPersons