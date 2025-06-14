const WeatherInfo = ({ weather }) => {
  return (
    <>
      <h3>Weather in {weather.name}</h3>
      <p>Temperature {weather.temperature} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
      />
      <p>Wind {weather.windSpeed} m/s</p>
    </>
  );
};

export default WeatherInfo;
