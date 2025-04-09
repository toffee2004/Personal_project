import React, { useEffect, useState } from 'react';
import '../../styles/filterBar.css'; // Correct path to the CSS file

const FilterBar = ({ onFilter, selectedCategory }) => {
  const [ageOptions, setAgeOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState(['Lon', 'Hộp', 'Thùng']);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState('');

  // Cập nhật danh sách độ tuổi dựa trên danh mục
  useEffect(() => {
    switch (selectedCategory) {
      case 'Sữa cho trẻ em':
        setAgeOptions(Array.from({ length: 16 }, (_, i) => i + 1)); // 1-16
        break;
      case 'Sữa cho người lớn':
        setAgeOptions(Array.from({ length: 34 }, (_, i) => i + 17)); // 17-50
        break;
      case 'Sữa cho người già':
        setAgeOptions(['Trên 50']);
        break;
      default:
        setAgeOptions(['----']);
    }
  }, [selectedCategory]);

  // Xử lý tăng giá trị giá tiền
  const handlePriceChange = (type, step) => {
    if (type === 'min') {
      setPriceMin((prev) => Math.max(0, prev + step)); // Không cho phép giá trị âm
    } else {
      setPriceMax((prev) => Math.max(0, (prev || 0) + step));
    }
  };

  return (
    <div className="filter-bar">
      <label>Độ Tuổi</label>
      <select id="age-range">
        {ageOptions.map((age, index) => (
          <option key={index} value={age}>
            {age}
          </option>
        ))}
      </select>

      <label>Nhãn Hiệu</label>
      <select id="brand-filter">
        <option value="" disabled selected>
          Chọn nhãn hiệu
        </option>
      </select>

      <label>Dạng</label>
      <select id="type-filter">
        {typeOptions.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label>Giá từ</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input
          type="number"
          id="price-min"
          value={priceMin}
          readOnly
          style={{ textAlign: 'center' }}
        />
        <button onClick={() => handlePriceChange('min', 50000)}>+</button>
      </div>

      <label>đến</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input
          type="number"
          id="price-max"
          value={priceMax}
          readOnly
          style={{ textAlign: 'center' }}
        />
        <button onClick={() => handlePriceChange('max', 50000)}>+</button>
      </div>

      {/* Nút Xác Nhận */}
      <button onClick={onFilter}>Xác Nhận</button>
    </div>
  );
};

export default FilterBar;