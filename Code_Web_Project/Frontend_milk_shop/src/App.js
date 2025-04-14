// Import necessary components and styles
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
// Import TestConnect component
import TestConnect from './test_connect';

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

  // Determine age values based on the category
  const getAgeOptions = () => {
    if (selectedCategory === 'Milk for children') {
      return Array.from({ length: 16 }, (_, i) => i + 1); // From 1 to 16
    } else if (selectedCategory === 'Milk for adults') {
      return Array.from({ length: 34 }, (_, i) => i + 17); // From 17 to 50
    } else if (selectedCategory === 'Milk for the elderly') {
      return Array.from({ length: 50 }, (_, i) => i + 51); // From 51 to 100
    }
    return []; // Default no values
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
      {/* Filter by age */}
      <label>Age</label>
      <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
        <option value="">All</option>
        {getAgeOptions().map((age) => (
          <option key={age} value={age}>
            {age}
          </option>
        ))}
      </select>

      {/* Filter by brand */}
      <label>Brand</label>
      <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
        <option value="">All</option>
        <option value="Vinamilk">Vinamilk</option>
        <option value="Abbott">Abbott</option>
        <option value="Nutifood">Nutifood</option>
        <option value="Fonterra">Fonterra</option>
        <option value="FrieslandCampina">FrieslandCampina</option>
        <option value="Namyang">Namyang</option>
      </select>

      {/* Filter by type */}
      <label>Type</label>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        <option value="">All</option>
        <option value="Can">Can</option>
        <option value="Box">Box</option>
        <option value="Carton">Carton</option>
      </select>

      {/* Filter by price */}
      <label>Price</label>
      <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
        <option value="">All</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* Filter button */}
      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

const App = () => {
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    { id: 1, name: 'Dielac Alpha Milk', brand: 'Vinamilk', type: 'Can', price: 200000, ageRange: '1-3' },
    { id: 2, name: 'Ensure Gold Milk', brand: 'Abbott', type: 'Box', price: 500000, ageRange: '51-100' },
    { id: 3, name: 'Grow Plus Milk', brand: 'Nutifood', type: 'Carton', price: 300000, ageRange: '4-10' },
    { id: 4, name: 'Anlene Milk', brand: 'Fonterra', type: 'Can', price: 400000, ageRange: '17-50' },
    { id: 5, name: 'Friso Gold Milk', brand: 'FrieslandCampina', type: 'Box', price: 350000, ageRange: '1-6' },
    { id: 6, name: 'XO Milk', brand: 'Namyang', type: 'Can', price: 450000, ageRange: '7-12' },
    { id: 7, name: 'PediaSure Milk', brand: 'Abbott', type: 'Carton', price: 550000, ageRange: '1-10' },
    { id: 8, name: 'Dielac Grow Milk', brand: 'Vinamilk', type: 'Box', price: 250000, ageRange: '4-16' },
    { id: 9, name: 'Ensure Original Milk', brand: 'Abbott', type: 'Can', price: 480000, ageRange: '61-100' },
    { id: 10, name: 'Optimum Gold Milk', brand: 'Vinamilk', type: 'Carton', price: 400000, ageRange: '1-3' },
    { id: 11, name: 'Dielac Alpha Milk', brand: 'Vinamilk', type: 'Can', price: 200000, ageRange: '3-7' },
    { id: 12, name: 'Ensure Gold Milk', brand: 'Abbott', type: 'Box', price: 500000, ageRange: '80-100' },
    { id: 13, name: 'Grow Plus Milk', brand: 'Nutifood', type: 'Carton', price: 300000, ageRange: '8-10' },
    { id: 14, name: 'Anlene Milk', brand: 'Fonterra', type: 'Can', price: 400000, ageRange: '17-55' },
    { id: 15, name: 'Friso Gold Milk', brand: 'FrieslandCampina', type: 'Box', price: 350000, ageRange: '2-7' },
    { id: 16, name: 'XO Milk', brand: 'Namyang', type: 'Can', price: 450000, ageRange: '7-16' },
    { id: 17, name: 'PediaSure Milk', brand: 'Abbott', type: 'Carton', price: 550000, ageRange: '5-10' },
    { id: 18, name: 'Dielac Grow Milk', brand: 'Vinamilk', type: 'Box', price: 250000, ageRange: '12-16' },
    { id: 19, name: 'Ensure Original Milk', brand: 'Abbott', type: 'Can', price: 480000, ageRange: '55-100' },
    { id: 20, name: 'Optimum Gold Milk', brand: 'Vinamilk', type: 'Carton', price: 400000, ageRange: '1-16' },
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
  
    // Filter products by category
    let ageRange = '';
    if (categoryName === 'Milk for children') {
      ageRange = '1-16';
    } else if (categoryName === 'Milk for adults') {
      ageRange = '17-50';
    } else if (categoryName === 'Milk for the elderly') {
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
  
    // Filter by age
    if (age) {
      filtered = filtered.filter((product) => {
        const [minAge, maxAge] = product.ageRange.split('-').map(Number);
        return age >= minAge && age <= (maxAge || Infinity);
      });
    }
  
    // Filter by brand
    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }
  
    // Filter by type
    if (type) {
      filtered = filtered.filter((product) => product.type === type);
    }
  
    // Filter by price
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

  const itemsPerPage = 6; // Number of products per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      <Header onSearch={handleSearch} onShowAllProducts={handleShowAllProducts} />
      {/* Hiển thị TestConnect kế bên Header */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <TestConnect />
      </div>


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
                    <p>Brand: {product.brand}</p>
                    <p>Type: {product.type}</p>
                    <p>Price: {product.price.toLocaleString()} VND</p>
                    <p className="age-range">Age range: {product.ageRange}</p>
                  </div>
                ))
              ) : (
                <p id="no-products-message">No matching products found.</p>
              )}
            </div>
          </div>
        </div>
        <Pagination
          totalPages={Math.ceil(filteredProducts.length / itemsPerPage)} // Total pages
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />

    </div>
  );
};

export default App;