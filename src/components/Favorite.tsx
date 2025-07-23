import React from "react";

const Favorites: React.FC = () => (
  <div className="favorites-section">
    <div className="section-title">Страны</div>
    <div className="favorites-list">
      <div className="favorite-item">
        <div className="item-name">Фергана</div>
        <span className="item-temp">38°C</span>
      </div>
      <div className="favorite-item">
        <div className="item-name">Наманган</div>
        <span className="item-temp">35°C</span>
      </div>
    </div>
  </div>
);

export default Favorites;
