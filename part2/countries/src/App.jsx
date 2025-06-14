import { useEffect, useState } from "react";
import countryService from "./services/Countries";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [value, setValue] = useState("");
  const [relevantCountries, setRelevantCountries] = useState(null);
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    countryService
      .getAll()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) =>
        console.log(`Unexpected error while fetching :${error}`)
      );
  }, []);

  const filterCountries = (value) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
  };
  

  const handleChange = (event) => {
    const currentValue = event.target.value;
    setValue(event.target.value);
    const relevantCountries = filterCountries(currentValue);
    if (relevantCountries.length == 1) {
      const selectedCountry = relevantCountries[0].name.common.toLowerCase();
      setRelevantCountries(null);
      countryService
        .getByName(selectedCountry)
        .then((response) => setCountry(response));
    } else if (relevantCountries.length > 10) {
      setRelevantCountries(null);
      setCountry(null);
    } else {
      setRelevantCountries(relevantCountries);
      setCountry(null);
    }
  };

  return (
    <>
      <p>fetch countries: </p>
      <input type="text" value={value} onChange={handleChange} />
      {relevantCountries &&
        relevantCountries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      {country && <CountryInfo country={country}></CountryInfo>}
    </>
  );
}

export default App;
