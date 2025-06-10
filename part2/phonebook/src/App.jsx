import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 

  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[searchName, setSearchName] = useState('')
  const[searchInput, setSearchInput] = useState('')
  const [searchPerformed, setSearchPerformed] = useState(false);


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchClick = (_) => {
    setSearchName(searchInput);
    setSearchInput('');
    setSearchPerformed(true);
  }

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault()
    setSearchPerformed(false)
    setSearchName("")
    const similarNames = persons.filter((person) => newName === person.name)
    if (!similarNames.length)
    {
      const nameObj = { name: newName , number: newNumber, id: persons.length}
      setPersons(persons.concat(nameObj))
      setNewName("")
      setNewNumber("")
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  const matchedPerson = persons.find((person) => person.name === searchName)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input type="text" placeholder='Enter name here' value={searchInput} onChange={handleSearchInputChange} required/>
        <button onClick={handleSearchClick}>Search</button>
        {setSearchPerformed && matchedPerson && (<p>{matchedPerson.name} {matchedPerson.number}</p>)}
        {setSearchPerformed && !matchedPerson && searchName && (<p>No matches found.</p>)}
      </div>
      <h2>Add phone numbers</h2>
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