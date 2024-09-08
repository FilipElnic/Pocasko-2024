import "./weather.css";
import searchIcon from "../assets/search.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import { useState, useEffect, useRef } from "react";

function Weather() {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/
      weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error fetching weather data", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        <img
          src={searchIcon}
          alt="search icon"
          onClick={() => search(inputRef.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt=""
            className="weatherIcon"
          />
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="city">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} />
              <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
