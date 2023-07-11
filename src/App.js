import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file here

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/weather/${city}`);
      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="input-section">
        <input className="input-field" type="text" onChange={e => setCity(e.target.value)} placeholder="Enter city name..." />
        <button className="fetch-button" onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h1>{weather.name}</h1>
          <h2>{Math.floor(weather.main.temp - 273.15)}°C</h2>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
