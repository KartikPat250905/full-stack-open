const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      {country.languages && (
        <ul>
          {Object.entries(country.languages).map(([code, name]) => (
            <li key={code}>{name}</li>
          ))}
        </ul>
      )}
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};

export default CountryInfo;
