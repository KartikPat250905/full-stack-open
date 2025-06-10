const PersonForm = ({
    addName,
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
}) => {
    return(
      <form onSubmit={addName}>
        <div>
          name: <input type="text" placeholder='Enter name here' value={newName} onChange={handleNameChange} required/>
        </div>
        <div>
          number: <input type="tel" placeholder='Enter number here' value={newNumber} onChange={handleNumberChange} required/>
        </div>
          <button type="submit">add</button>
      </form>
    )
}

export default PersonForm