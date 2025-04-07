import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div className="product" key={index}>
          <div className="product-icon">{product.icon}</div>
          <p className="product-name">Tên: {product.name}</p>
          <p className="product-price">Giá: {product.price}</p>
          <p className="product-age">Độ tuổi: {product.age}</p>
          <p className="product-type">Dạng: {product.type}</p>
          <p className="product-brand">Nhãn hiệu: {product.brand}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;