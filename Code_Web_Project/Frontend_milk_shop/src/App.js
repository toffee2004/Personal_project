import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Breadcrumb from './components/Breadcrumb';
import FilterBar from './components/FilterBar';
import ProductList from './components/ProductList';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import './styles.css';

const App = () => {
  const [products, setProducts] = useState([]); // Replace with actual product data
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    // Implement search logic
  };

  const handleShowAllProducts = () => {
    // Implement show all products logic
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
      <Sidebar onCategorySelect={handleCategorySelect} />
      <main>
        <Breadcrumb category={category} />
        <FilterBar onFilter={handleFilter} selectedCategory={category} />
        <ProductList products={products} />
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
