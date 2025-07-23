import React from "react";

interface HeaderProps {
  city: string;
  country: string;
}

const Header: React.FC<HeaderProps> = ({ city, country }) => (
  <div className="header">
    <div className="logo">
      <span className="logo-icon">🌤️</span>
      <span className="logo-text">Погода для инвалидов</span>
    </div>
    <div className="time-info">
      <div className="current-time">{new Date().toLocaleTimeString()}</div>
      <div className="current-date">
        {new Date().toLocaleDateString("uz-UZ", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="location">
        📍 {city}, {country}
      </div>
    </div>
  </div>
);

export default Header;
