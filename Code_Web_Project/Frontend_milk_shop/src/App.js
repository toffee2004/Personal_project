// Import necessary components and styles
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

// Import separated styles
import './styles/container.css';
import './styles/productList.css';
import './styles/productItem.css';
import './styles/filterBar.css';
import './styles/pagination.css';

const FilterBar = ({ onFilter, selectedCategory }) => {
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  // Xác định các giá trị độ tuổi dựa trên danh mục
  const getAgeOptions = () => {
    if (selectedCategory === 'Sữa cho trẻ em') {
      return Array.from({ length: 16 }, (_, i) => i + 1); // Từ 1 đến 16
    } else if (selectedCategory === 'Sữa cho người lớn') {
      return Array.from({ length: 34 }, (_, i) => i + 17); // Từ 17 đến 50
    } else if (selectedCategory === 'Sữa cho người già') {
      return Array.from({ length: 50 }, (_, i) => i + 51); // Từ 51 đến 100
    }
    return []; // Mặc định không có giá trị
  };

  const handleFilterClick = () => {
    onFilter({
      age: selectedAge,
      brand: selectedBrand,
      type: selectedType,
      price: selectedPrice,
    });
  };

  return (
    <div className="filter-bar">
      {/* Lọc theo độ tuổi */}
      <label>Độ Tuổi</label>
      <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
        <option value="">Tất cả</option>
        {getAgeOptions().map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
      </select>

      {/* Lọc theo thương hiệu */}
      <label>Thương Hiệu</label>
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">Tất cả</option>
        <option value="Vinamilk">Vinamilk</option>
        <option value="Abbott">Abbott</option>
        <option value="Nutifood">Nutifood</option>
        <option value="Fonterra">Fonterra</option>
        <option value="FrieslandCampina">FrieslandCampina</option>
        <option value="Namyang">Namyang</option>
      </select>

      {/* Lọc theo dạng */}
      <label>Dạng</label>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">Tất cả</option>
        <option value="Lon">Lon</option>
        <option value="Hộp">Hộp</option>
        <option value="Thùng">Thùng</option>
      </select>

      {/* Lọc theo giá */}
      <label>Giá</label>
      <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
        <option value="">Tất cả</option>
        <option value="asc">Giá tăng dần</option>
        <option value="desc">Giá giảm dần</option>
      </select>

      {/* Nút Lọc */}
      <button onClick={handleFilterClick}>Lọc</button>
    </div>
  );
};

const App = () => {
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    { id: 1, name: 'Sữa Dielac Alpha', brand: 'Vinamilk', type: 'Lon', price: 200000, ageRange: '1-3' },
    { id: 2, name: 'Sữa Ensure Gold', brand: 'Abbott', type: 'Hộp', price: 500000, ageRange: '51-100' },
    { id: 3, name: 'Sữa Grow Plus', brand: 'Nutifood', type: 'Thùng', price: 300000, ageRange: '4-10' },
    { id: 4, name: 'Sữa Anlene', brand: 'Fonterra', type: 'Lon', price: 400000, ageRange: '17-50' },
    { id: 5, name: 'Sữa Friso Gold', brand: 'FrieslandCampina', type: 'Hộp', price: 350000, ageRange: '1-6' },
    { id: 6, name: 'Sữa XO', brand: 'Namyang', type: 'Lon', price: 450000, ageRange: '7-12' },
    { id: 7, name: 'Sữa PediaSure', brand: 'Abbott', type: 'Thùng', price: 550000, ageRange: '1-10' },
    { id: 8, name: 'Sữa Dielac Grow', brand: 'Vinamilk', type: 'Hộp', price: 250000, ageRange: '4-16' },
    { id: 9, name: 'Sữa Ensure Original', brand: 'Abbott', type: 'Lon', price: 480000, ageRange: '61-100' },
    { id: 10, name: 'Sữa Optimum Gold', brand: 'Vinamilk', type: 'Thùng', price: 400000, ageRange: '1-3' },
    { id: 11, name: 'Sữa Dielac Alpha', brand: 'Vinamilk', type: 'Lon', price: 200000, ageRange: '3-7' },
    { id: 12, name: 'Sữa Ensure Gold', brand: 'Abbott', type: 'Hộp', price: 500000, ageRange: '80-100' },
    { id: 13, name: 'Sữa Grow Plus', brand: 'Nutifood', type: 'Thùng', price: 300000, ageRange: '8-10' },
    { id: 14, name: 'Sữa Anlene', brand: 'Fonterra', type: 'Lon', price: 400000, ageRange: '17-55' },
    { id: 15, name: 'Sữa Friso Gold', brand: 'FrieslandCampina', type: 'Hộp', price: 350000, ageRange: '2-7' },
    { id: 16, name: 'Sữa XO', brand: 'Namyang', type: 'Lon', price: 450000, ageRange: '7-16' },
    { id: 17, name: 'Sữa PediaSure', brand: 'Abbott', type: 'Thùng', price: 550000, ageRange: '5-10' },
    { id: 18, name: 'Sữa Dielac Grow', brand: 'Vinamilk', type: 'Hộp', price: 250000, ageRange: '12-16' },
    { id: 19, name: 'Sữa Ensure Original', brand: 'Abbott', type: 'Lon', price: 480000, ageRange: '55-100' },
    { id: 20, name: 'Sữa Optimum Gold', brand: 'Vinamilk', type: 'Thùng', price: 400000, ageRange: '1-16' },
  ]);
  
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (searchTerm, ageRange) => {
    const filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesAge = ageRange ? product.ageRange.includes(ageRange) : true;
      return matchesName && matchesAge;
    });
    setFilteredProducts(filtered);
  };

  const handleShowAllProducts = () => {
    setFilteredProducts(products);
  };

  const handleCategorySelect = (categoryName) => {
    setCategory(categoryName);
  
    // Lọc sản phẩm theo danh mục
    let ageRange = '';
    if (categoryName === 'Sữa cho trẻ em') {
      ageRange = '1-16';
    } else if (categoryName === 'Sữa cho người lớn') {
      ageRange = '17-50';
    } else if (categoryName === 'Sữa cho người già') {
      ageRange = '51-100';
    }
  
    const filtered = products.filter((product) => {
      const [minAge, maxAge] = ageRange.split('-').map(Number);
      const [productMinAge, productMaxAge] = product.ageRange.split('-').map(Number);
      return (
        (productMinAge >= minAge && productMinAge <= maxAge) ||
        (productMaxAge >= minAge && productMaxAge <= maxAge)
      );
    });
  
    setFilteredProducts(filtered);
  };

  const handleFilter = ({ age, brand, type, price }) => {
    let filtered = products;
  
    // Lọc theo độ tuổi
    if (age) {
      filtered = filtered.filter((product) => {
        const [minAge, maxAge] = product.ageRange.split('-').map(Number);
        return age >= minAge && age <= (maxAge || Infinity);
      });
    }
  
    // Lọc theo thương hiệu
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }
  
    // Lọc theo dạng
    if (type) {
      filtered = filtered.filter((product) => product.type === type);
    }
  
    // Lọc theo giá
    if (price === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (price === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
  
    setFilteredProducts(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 6; // Số sản phẩm mỗi trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      <Header onSearch={handleSearch} onShowAllProducts={handleShowAllProducts} />
      <main>
        <div className="container">
          <Sidebar onCategorySelect={handleCategorySelect} />
          <div>
            
            <div className="filter-bar">
              <FilterBar onFilter={handleFilter} selectedCategory={category} />
            </div>
            <div className="product-list">
              {productsToDisplay.length > 0 ? (
                productsToDisplay.map((product) => (
                  <div key={product.id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>Thương hiệu: {product.brand}</p>
                    <p>Dạng: {product.type}</p>
                    <p>Giá: {product.price.toLocaleString()} VND</p>
                    <p className="age-range">Độ tuổi: {product.ageRange}</p>
                  </div>
                ))
              ) : (
                <p id="no-products-message">Không có sản phẩm nào phù hợp.</p>
              )}
            </div>
          </div>
        </div>
        <Pagination
          totalPages={Math.ceil(filteredProducts.length / itemsPerPage)} // Tổng số trang
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;