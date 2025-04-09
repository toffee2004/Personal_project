import React, { useState } from 'react';
import '../styles/header.css';

const Header = ({ onSearch, onShowAllProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const handleSearchClick = () => {
    onSearch(searchTerm, ageRange);
  };

  return (
    <header className="header">
      <div className="search-bar">
        <label htmlFor="search-input">Tìm kiếm nhanh</label>
        <input
          type="text"
          id="search-input"
          placeholder="Tìm Kiếm Nhanh"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          id="age-range"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        >
          
          <option value="1-6">1-6 tuổi</option>
          <option value="1-16">1-16 tuổi</option>
          <option value="17-50">17-50 tuổi</option>
          <option value="50+">Trên 50 tuổi</option>
        </select>
        <button onClick={handleSearchClick}>🔍</button>
        <button onClick={onShowAllProducts}>Hiển thị tất cả</button>
      </div>
    </header>
  );
};

export default Header;