import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'
import personsService from './services/persons'




const Notification = ({message, isPositiveMessage}) => {
  if (message === null) {
    return null
  }


const messageStyle = isPositiveMessage ? 
{
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
:
{
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10

}
     


  return (
    <div style={messageStyle}>
      {message}
      </div>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isPositiveMessage, setIsPositiveMessage] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])



  
  const addPerson = (event) => {
    event.preventDefault()
    // Hieman hyödynsin https://stackoverflow.com/questions/22844560/check-if-object-value-exists-within-a-javascript-array-of-objects-and-if-not-add  Kushan Randiman vastausta yrittäessäni keksiä miten saisin tarkistettua, onko puhelinluettelossa samannimininen.
    if (persons.filter(person => person.name === newName).length!==0) {
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number of ${newName} `)){
       
        const toBeUpdatedPerson=persons.find(({name}) => name === newName)
        
        
        
        const updatedPerson={...toBeUpdatedPerson, number:newNumber}
        personsService
        .update(toBeUpdatedPerson.id, updatedPerson )
        .then(response => {
          setPersons(persons.map(person => person.id !== toBeUpdatedPerson.id ? person : response.data))
          setMessage(`${newName} has been updated with a new number`)
          setIsPositiveMessage(true)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setIsPositiveMessage(false)
          setMessage(`Information of ${newName} has already been removed from the server`)
          setPersons(persons.filter(n => n.id !== toBeUpdatedPerson.id))
        })


        return
      } else {
      setNewName('')

       return
  }
    }
    const personObject = {
    name: newName,
    number: newNumber
  }
    

    personsService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      setIsPositiveMessage(true)
      setMessage(`${newName} has been added to the phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })

    

    
}

  const PersonsToShow = nameFilter.length===0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter) === true)



const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleDelClick = (id, name) => {

if (window.confirm(`Are you sure you want to remove ${name}?`)) { 
  personsService
.remove(id)
.then(response => {

  setIsPositiveMessage(true)
  setMessage(`${name} has been removed from the phonebook`)
  setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
)
setPersons(persons.filter(person=>person.id !== id))
}





}

//Muutetaan lowercaseksi, käyttäjäkin näkee visuaalisesti, että kyseessä on case insensitive haku
const handleFilterChange = (event) => {
  setNameFilter(event.target.value.toLowerCase())
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isPositiveMessage={isPositiveMessage} />
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>    

      <h3>add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      {PersonsToShow.map((person) =>
        <DisplayPersons key={person.id} persons={person} handleDelClick={() => handleDelClick(person.id, person.name)} />
      )}
      
    </div>
  )

}
export default App