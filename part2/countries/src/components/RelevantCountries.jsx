const RelevantCountries = ({ relevantCountries, onClick }) => {
  return relevantCountries.map((country) => (
    <div key={country.name.common}>
      <p>{country.name.common}</p>
      <button onClick={() => onClick(country)}>Show</button>
    </div>
  ));
};

export default RelevantCountries;
