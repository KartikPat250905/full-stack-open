import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[searchName, setSearchName] = useState('')
  const[searchInput, setSearchInput] = useState('')
  const [searchPerformed, setSearchPerformed] = useState(false);


  useEffect(() => {
    console.log("Fetching data from the server")
    personService
         .getAll()
         .then((initialData) => {
            setPersons(initialData)
         })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonDeletion = (id) => {
    const personToDelete = persons.find((person) => id === person.id)
    window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)
    personService.deletePerson(id)
                .then(() => setPersons(person => person.filter(p => p.id !== id)))
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
      const nameObj = { name: newName , number: newNumber}
      personService.create(nameObj)
                   .then((note) => setPersons(persons.concat(note)))
      setNewName("")
      setNewNumber("")
    }
    else
      alert(`${newName} is already added to phonebook`)
  }

  const matchedPerson = persons.find((person) => person.name === searchName)

  const filterProps = {
    searchInput,
    handleSearchInputChange,
    setSearchPerformed : searchPerformed,
    matchedPerson,
    searchName,
    handleSearchClick
  }

  const personFormProps = {
    addName,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter {...filterProps}></Filter>
      <h2>Add phone numbers</h2>
        <PersonForm {...personFormProps}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={handlePersonDeletion}></Persons>
    </div>
  )
}

export default App