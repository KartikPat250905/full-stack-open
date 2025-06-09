import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const similarNames = persons.filter((person) => newName === person.name)
    if (!similarNames.length)
    {
      const nameObj = { name: newName }
      setPersons(persons.concat(nameObj))
      setNewName("")
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input type="text" placeholder='Enter name here' value={newName} onChange={handleNameChange}/>
        </div>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => <p key={index}>{person.name}</p>)}
    </div>
  )
}

export default App