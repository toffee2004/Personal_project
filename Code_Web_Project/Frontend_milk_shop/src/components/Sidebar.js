import React, { useState } from 'react';
import '../styles/sidebar.css'; // Correct path to the CSS file

const Sidebar = ({ onCategorySelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <ul>
        <li className="parent">
          <span>&#9776; </span>
          <ul className="submenu">
            <li onClick={() => onCategorySelect('Milk for children', '1-16')}>Milk for children</li>
            <li onClick={() => onCategorySelect('Milk for adults', '17-50')}>Milk for adults</li>
            <li onClick={() => onCategorySelect('Milk for seniors', '51-100')}>Milk for seniors</li>
            <li onClick={() => onCategorySelect('Other types of milk', '0-0')}>Other types of milk</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;