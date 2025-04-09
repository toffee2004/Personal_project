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
          <span>&#9776; Danh mục sữa</span>
          <ul className="submenu">
            <li onClick={() => onCategorySelect('Sữa cho trẻ em', '1-16')}>Sữa cho trẻ em</li>
            <li onClick={() => onCategorySelect('Sữa cho người lớn', '17-50')}>Sữa cho người lớn</li>
            <li onClick={() => onCategorySelect('Sữa cho người già', '51-100')}>Sữa cho người già</li>
            <li onClick={() => onCategorySelect('Các loại sữa khác', '0-0')}>Các loại sữa khác</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;