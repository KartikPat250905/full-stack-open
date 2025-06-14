import { useEffect, useState } from "react";
import countryService from "./services/Countries";
import CountryInfo from "./components/CountryInfo";
import RelevantCountries from "./components/RelevantCountries";
import weatherService from "./services/Weather";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  const [value, setValue] = useState("");
  const [relevantCountries, setRelevantCountries] = useState(null);
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState(null);

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

  useEffect(() => {
    if (!country)
    {
      setWeather(null);
      return;
    }
    const capital = country.capital[0];
    weatherService
      .getWeatherByName(capital)
      .then((response) => {
        console.log(response);
        setWeather({
          temperature: response.main.temp,
          windSpeed: response.wind.speed,
          icon: response.weather[0].icon,
          name: capital,
          description: response.weather[0].description,
        });
      })
      .catch((error) => console.log(error));
  }, [country]);

  const filterCountries = (value) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleShowCountry = (country) => {
    setRelevantCountries(null);
    setCountry(country);
    setValue("");
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
      {relevantCountries && (
        <RelevantCountries
          relevantCountries={relevantCountries}
          onClick={handleShowCountry}
        ></RelevantCountries>
      )}
      {country && <CountryInfo country={country}></CountryInfo>}
      {weather && <WeatherInfo weather={weather}></WeatherInfo>}
    </>
  );
}

export default App;
