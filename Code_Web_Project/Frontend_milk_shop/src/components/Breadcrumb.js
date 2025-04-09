import React from 'react';
import '../styles/breadcrumb.css'; // Correct path to the CSS file
const Breadcrumb = ({ category }) => {
  return (
    <div className="breadcrumb">
      <span>Chức năng</span> &gt; <span>Phân Loại</span> &gt;
    </div>
  );
};

export default Breadcrumb;