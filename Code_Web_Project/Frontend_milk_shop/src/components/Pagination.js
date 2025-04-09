import React from 'react';
import '../styles/pagination.css'; // Correct path to the CSS file
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          className={i + 1 === currentPage ? 'active' : ''}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
};

export default Pagination;