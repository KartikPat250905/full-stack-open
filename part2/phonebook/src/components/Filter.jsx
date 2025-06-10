const Filter = ({
    searchInput, 
    handleSearchInputChange, 
    setSearchPerformed, 
    matchedPerson, 
    searchName,
    handleSearchClick}) => {
    return (
        <>
            filter shown with: 
            <input type="text" 
            placeholder='Enter name here' 
            value={searchInput} 
            onChange={handleSearchInputChange} 
            required/>
            <button onClick={handleSearchClick}>Search</button>
            {setSearchPerformed && matchedPerson && (<p>{matchedPerson.name} {matchedPerson.number}</p>)}
            {setSearchPerformed && !matchedPerson && searchName && (<p>No matches found.</p>)}
        </>
    )
}

export default Filter