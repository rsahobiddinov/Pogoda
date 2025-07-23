import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "5317e454ea9433cfe350be0b129a6e22";

interface WeatherData {
  name: string;
  sys: { country: string; sunrise: number; sunset: number };
  weather: { main: string; description: string }[];
  main: { temp: number; feels_like: number; humidity: number; pressure: number };
  wind: { speed: number };
  visibility: number;
}

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; main: string }[];
}

function App() {
  const [city, setCity] = useState<string>("Toshkent");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherAndForecast = async (cityName: string) => {
    try {
      setLoading(true);
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=uz`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=uz`),
      ]);

      if (!weatherRes.ok) throw new Error("Shahar topilmadi!");
      if (!forecastRes.ok) throw new Error("Prognoz topilmadi!");

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData.list.slice(0, 5 * 8)); 
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherAndForecast(city);
  }, []);

  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧️";
      case "Snow": return "❄️";
      default: return "🌤️";
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo"><span className="logo-icon">🌤️</span><span className="logo-text">Ob-havo Ilovasi</span></div>
        <div className="time-info">
          <div className="current-time">{new Date().toLocaleTimeString()}</div>
          <div className="current-date">{new Date().toLocaleDateString("uz-UZ", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="location">📍 {weather?.name || city}, {weather?.sys?.country || "UZ"}</div>
        </div>
      </div>

      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Shahar nomini kiriting..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-btn" onClick={() => fetchWeatherAndForecast(city)}>🔍 Qidirish</button>
          {loading && <div className="loading">⏳</div>}
        </div>
      </div>

      {weather && (
        <div className="main-content">
          <div className="weather-card">
            <div className="city-name">{weather.name.toUpperCase()}</div>
            <div className="country-name">{weather.sys.country}</div>
            <div className="weather-icon">{getWeatherIcon(weather.weather[0].main)}</div>
            <div className="weather-condition">{weather.weather[0].description}</div>
            <div className="main-temp">{Math.round(weather.main.temp)}°C</div>
            <div className="feels-like">His qilinish: {Math.round(weather.main.feels_like)}°C</div>
            <div className="weather-details">
              <div className="detail-item">💧 Namlik: {weather.main.humidity}%</div>
              <div className="detail-item">🌬️ Shamol: {weather.wind.speed} m/s</div>
              <div className="detail-item">📊 Bosim: {weather.main.pressure} hPa</div>
              <div className="detail-item">👁️ Ko‘rish: {weather.visibility / 1000} km</div>
            </div>
            <div className="sun-times">
              <div className="sun-item">🌅 {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
              <div className="sun-item">🌇 {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
            </div>
          </div>
        </div>
      )}

      {/* Forecast Section */}
      {forecast.length > 0 && (
        <div className="forecast-section" style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#fff", marginBottom: "10px" }}>5 Kunlik Prognoz</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
            {forecast
              .filter((_, index) => index % 8 === 0) // Har kun uchun bitta
              .map((item, idx) => (
                <div key={idx} className="weather-card" style={{ flex: "1 1 150px", padding: "20px" }}>
                  <div>{new Date(item.dt_txt).toLocaleDateString("uz-UZ", { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                  <div className="weather-icon" style={{ fontSize: "40px" }}>{getWeatherIcon(item.weather[0].main)}</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold" }}>{Math.round(item.main.temp)}°C</div>
                  <div style={{ fontSize: "14px" }}>{item.weather[0].description}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
