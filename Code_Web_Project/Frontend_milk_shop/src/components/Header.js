import React from 'react';
import '../styles/header.css';

const Header = ({ onSearch, onShowAllProducts }) => {
  return (
    <header className="header">
      <div className="search-bar">
        <label htmlFor="search-input">Tìm kiếm nhanh</label>
        <input type="text" id="search-input" placeholder="Tìm Kiếm Nhanh" />
        <button onClick={onSearch}>🔍</button>
      </div>
    </header>
  );
};

export default Header;