import React from "react";

interface ForecastListProps {
  forecast: any[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const getIcon = (main: string) =>
    main === "Clear"
      ? "☀️"
      : main === "Clouds"
      ? "☁️"
      : main === "Rain"
      ? "🌧️"
      : main === "Snow"
      ? "❄️"
      : "🌤️";

  return (
    <div className="forecast-section" style={{ marginTop: "20px" }}>
      <h2 style={{ color: "#fff", marginBottom: "10px" }}>5 Kunlik Prognoz</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {forecast
          .filter((_, idx) => idx % 8 === 0)
          .map((item, idx) => (
            <div
              key={idx}
              className="weather-card"
              style={{ flex: "1 1 150px", padding: "20px" }}
            >
              <div>
                {new Date(item.dt_txt).toLocaleDateString("uz-UZ", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="weather-icon" style={{ fontSize: "40px" }}>
                {getIcon(item.weather[0].main)}
              </div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {Math.round(item.main.temp)}°C
              </div>
              <div style={{ fontSize: "14px" }}>
                {item.weather[0].description}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ForecastList;
