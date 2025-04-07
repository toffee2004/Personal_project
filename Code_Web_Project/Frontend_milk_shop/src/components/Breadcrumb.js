import React from 'react';

const Breadcrumb = ({ category }) => {
  return (
    <div className="breadcrumb">
      <span>Chức năng</span> &gt; <span>Phân Loại</span> &gt; <span>{category || 'Trang chủ'}</span>
    </div>
  );
};

export default Breadcrumb;