import { useState, useEffect } from "react";
import axios from "axios";

function WeatherInfo({ capital }) {
  const [weather, setWeather] = useState({});
  const hook = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  };

  useEffect(hook, [capital]);

  if("main" in weather){
      return (
        <div>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {weather.main?.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather icon" width={100} />
          <p>Wind: {weather.wind?.speed} m/s</p>
        </div>
      );
  }
}

export default WeatherInfo;
