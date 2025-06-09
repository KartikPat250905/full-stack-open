import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const similarNames = persons.filter((person) => newName === person.name)
    if (!similarNames.length)
    {
      const nameObj = { name: newName , number: newNumber}
      setPersons(persons.concat(nameObj))
      setNewName("")
      setNewNumber("")
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input type="text" placeholder='Enter name here' value={newName} onChange={handleNameChange} required/>
        </div>
        <div>
          number: <input type="tel" placeholder='Enter number here' value={newNumber} onChange={handleNumberChange} required/>
        </div>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App