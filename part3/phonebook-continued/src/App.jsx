import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Fetching data from the server");
    personService
      .getAll()
      .then((initialData) => {
        setPersons(initialData);
      })
      .catch((error) => {
        setNotification(`Error fetching data from the server`);
        console.log("Error fetching data:", error);
        setError(true);
        setTimeout(() => {
          setNotification(null);
          setError(false);
        }, 4000);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonDeletion = (id) => {
    const personToDelete = persons.find((person) => id === person.id);
    if (
      window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)
    ) {
      personService
        .deletePerson(id)
        .then(() => setPersons((person) => person.filter((p) => p.id !== id)))
        .catch((error) => {
          setNotification(`Error occured with deletion`);
          console.log("Error deletion:", error);
          setError(true);
          setTimeout(() => {
            setNotification(null);
            setError(false);
          }, 4000);
        });
    }
  };

  const handleSearchClick = (_) => {
    setSearchName(searchInput);
    setSearchInput("");
    setSearchPerformed(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const addName = (event) => {
    event.preventDefault();
    setSearchPerformed(false);
    setSearchName("");
    const similarNames = persons.filter((person) => newName === person.name);
    if (!similarNames.length) {
      const nameObj = { name: newName, number: newNumber };
      personService
        .create(nameObj)
        .then((newObj) => {
          setPersons(persons.concat(newObj));
          setNotification(`Added ${newName}`);
          setError(false);
          setTimeout(() => setNotification(null), 4000);
        })
        .catch((error) => {
          setNotification(`Failed to add ${newName} to the server`);
          setError(true);
          setTimeout(() => {
            setNotification(null);
            setError(false);
          }, 4000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedObj = { ...similarNames[0], number: newNumber };
        console.log(similarNames);
        personService
          .update(similarNames[0].id, updatedObj)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.name === updatedPerson.name ? updatedPerson : p
              )
            );
            setNotification(`Changed the contact number for ${newName}`);
            setTimeout(() => setNotification(null), 4000);
          })
          .catch((error) => {
            setNotification(
              `Information of ${newName} has already been removed from the server`
            );
            setPersons(
              persons.filter((person) => person.id !== similarNames[0].id)
            );
            setError(true);
            setTimeout(() => {
              setNotification(null);
              setError(false);
            }, 4000);
          });
      }
    }
    setNewName("");
    setNewNumber("");
  };

  const matchedPerson = persons.find((person) => person.name === searchName);

  const filterProps = {
    searchInput,
    handleSearchInputChange,
    setSearchPerformed: searchPerformed,
    matchedPerson,
    searchName,
    handleSearchClick,
  };

  const personFormProps = {
    addName,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error}></Notification>
      <Filter {...filterProps}></Filter>
      <h2>Add phone numbers</h2>
      <PersonForm {...personFormProps}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={handlePersonDeletion}></Persons>
    </div>
  );
};

export default App;
