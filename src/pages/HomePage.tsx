import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchSection from "../components/SearchSection";
import MainWeatherCard from "../components/MainWeatherCard";
import ForecastList from "../components/ForecastList";
import Sidebar from "../components/Sidebar";

const API_KEY = "edc6531b6be583f1202b8739046082e5";

const HomePage = () => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [w, f] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=uz`
        ).then((r) => r.json()),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=uz`
        ).then((r) => r.json()),
      ]);
      setWeather(w);
      setForecast(f.list.slice(0, 40));
    } catch {
      alert("Ощибка техники!!!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Header
        city={weather?.name || city}
        country={weather?.sys?.country || "UZ"}
      />
      <SearchSection
        city={city}
        setCity={setCity}
        onSearch={fetchData}
        loading={loading}
      />
      {weather && <MainWeatherCard weather={weather} />}
      {forecast.length > 0 && <ForecastList forecast={forecast} />}
      <Sidebar />
    </div>
  );
};

export default HomePage;
