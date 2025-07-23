import React from "react";

interface SearchProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SearchSection: React.FC<SearchProps> = ({
  city,
  setCity,
  onSearch,
  loading,
}) => (
  <div className="search-section">
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Shahar nomini kiriting..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="search-btn" onClick={onSearch}>
        Шас найдем... поиск!!!
      </button>
      {loading && <div className="loading">⏳</div>}
    </div>
  </div>
);

export default SearchSection;
