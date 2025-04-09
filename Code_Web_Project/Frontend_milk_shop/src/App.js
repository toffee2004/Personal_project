// Import necessary components and styles
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Breadcrumb from './components/Breadcrumb';
import FilterBar from './pages/users/FilterBar';
// import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

// Import separated styles
import './styles/common.css';


const App = () => {
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    // Implement search logic
  };

  const handleShowAllProducts = () => {
    // Implement logic to show all products
  };

  const handleCategorySelect = (categoryName) => {
    setCategory(categoryName);
    // Implement category filtering logic
  };

  const handleFilter = () => {
    // Implement filter logic
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Header onSearch={handleSearch} onShowAllProducts={handleShowAllProducts} />
      <main>
        <div className="container">
          <Sidebar onCategorySelect={handleCategorySelect} />
          <div>
            <Breadcrumb category={category} />
            <div className="filter-bar">
              <FilterBar onFilter={handleFilter} selectedCategory={category} />
            </div>
          </div>
        </div>
        {/* <ProductList products={products} /> */}
        <Pagination
          totalPages={5} // Replace with actual total pages
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;