import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnRender from './BtnRender';
import './productlist.css';

const ProductList = ({ product, isAdmin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Add your wishlist logic here
    console.log(`${isWishlisted ? 'Removed from' : 'Added to'} wishlist:`, product.title);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return null;
  };

  const discountPercentage = calculateDiscount();

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!imageLoaded && !imageError && (
          <div className="image-skeleton" aria-label="Loading image"></div>
        )}
        
        {imageError ? (
          <div className="image-placeholder">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#ccc">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span>Image not available</span>
          </div>
        ) : (
          <img
            src={product.images?.url || product.images}
            alt={product.title}
            className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {discountPercentage && (
          <div className="discount-badge">
            -{discountPercentage}%
          </div>
        )}
        
        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        <div className="quick-view-overlay">
          <Link 
            to={`/detail/${product._id}`} 
            className="quick-view-btn"
            aria-label="Quick view product"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="product-content">
        {product.category && (
          <div className="product-category">
            {product.category}
          </div>
        )}
        
        <Link to={`/detail/${product._id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>
        
        {product.description && (
          <p className="product-description">
            {product.description.length > 100 
              ? `${product.description.substring(0, 100)}...` 
              : product.description}
          </p>
        )}

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`star ${i < (product.rating || 4) ? 'filled' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          {product.reviews && (
            <span className="rating-count">({product.reviews})</span>
          )}
        </div>

        <div className="product-price-section">
          {product.originalPrice && product.originalPrice !== product.price && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
          <span className="current-price">{formatPrice(product.price)}</span>
        </div>

        {product.inStock !== undefined && (
          <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </div>
        )}

        <div className="product-actions">
          <BtnRender product={product} isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
