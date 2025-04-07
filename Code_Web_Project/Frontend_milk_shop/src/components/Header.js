import React from 'react';

const Header = ({ onSearch, onShowAllProducts }) => {
  return (
    <header className="header">
      <div className="search-bar">
        <button onClick={onShowAllProducts} className="home-button">Trang chủ</button>
        <label htmlFor="search-input">Tìm kiếm nhanh</label>
        <input type="text" id="search-input" placeholder="Tìm Kiếm Nhanh" />
        <button onClick={onSearch}>🔍</button>
      </div>
    </header>
  );
};

export default Header;