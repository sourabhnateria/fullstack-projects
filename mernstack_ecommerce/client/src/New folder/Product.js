import React, { useContext, useState } from 'react';
import { GlobaLState } from '../../../GlobalState';
import ProductList from '../utils/ProductLists/ProductList';
import './product.css';

const Product = () => {
  // ALL hooks must be declared at the top
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const state = useContext(GlobaLState);
  
  // Extract data with default values to avoid issues
  const products = state?.productAPI?.products?.[0] || [];
  const loading = state?.productAPI?.loading?.[0] || false;
  const error = state?.productAPI?.error?.[0] || null;

  // Helper function to render error states
  const renderErrorState = (title, message, showReload = true) => (
    <div className="products-container">
      <div className="error-message">
        <h2>{title}</h2>
        <p>{message}</p>
        {showReload && (
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );

  // Check for various error conditions
  if (!state || !state.productAPI) {
    return renderErrorState(
      "Configuration Error", 
      "GlobalState context is not properly configured."
    );
  }

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return renderErrorState("Error Loading Products", error);
  }

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return renderErrorState(
      "Data Format Error", 
      "Products data is not in the expected format."
    );
  }

  // Filter and sort products
  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'all' || product.category === filterCategory)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return (a.price || 0) - (b.price || 0);
      case 'price-high': return (b.price || 0) - (a.price || 0);
      case 'name': return (a.title || '').localeCompare(b.title || '');
      default: return 0;
    }
  });

  return (
    <div className="products-container">
      <div className="products-header">
        <h2 className="products-title">Our Products</h2>
        
        <div className="products-controls">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-wrapper">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="t-shirts">T-shirts</option>
              <option value="jeans">Jeans</option>
              {/* <option value="books">Books</option> */}
            </select>
          </div>
          
          <div className="sort-wrapper">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductList key={product._id || product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && products.length > 0 && (
        <div className="no-products">
          <p>No products found matching your criteria.</p>
        </div>
      )}

      {products.length === 0 && (
        <div className="no-products">
          <p>No products available.</p>
        </div>
      )}
      <div className='footer'><p>This website is developed by <a href='https://sourabhnateria.vercel.app/'><p className='Admin'>Sourabh Nateria</p></a></p></div>
    </div>
    
  );
};

export default Product;
