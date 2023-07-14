import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file here

const API_URL = "https://jade-gorgeous-foal.cyclic.app";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/weather/${city}`);
      setLoading(false);
      setWeather(data);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setWeather(null);
      alert("City not found. Please try again...");
    }
  };

  return (
    <div className="App">
      <div className="input-section">
        <input
          className="input-field"
          type="text"
          placeholder="Enter city name..."
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="fetch-button"
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
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
