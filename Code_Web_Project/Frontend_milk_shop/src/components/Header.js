import React, { useState } from 'react';
import '../styles/header.css';

const Header = ({ onSearch, onShowAllProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <header className="header">
      <div className="search-bar">
        <label htmlFor="search-input">Quick search</label>
        <input
          type="text"
          id="search-input"
          placeholder="Search quickly"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearchClick}>🔍</button>
        <button onClick={onShowAllProducts}>Show all</button>
        <button onClick={() => setSearchTerm('')}>Clear</button>
      </div>
    </header>
  );
};

export default Header;