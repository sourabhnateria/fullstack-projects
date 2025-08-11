import React, { useContext, useState } from 'react';
import { GlobaLState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';
import './btnrender.css';

const BtnRender = ({ product }) => {
  const state = useContext(GlobaLState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addCart = state.userAPI.addCart;

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsLoading(true);
      try {
        // Add your delete logic here
        console.log('Deleting product:', product._id);
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isAdmin) {
    return (
      <div className="admin-actions">
        <Link 
          to={`/edit_product/${product._id}`} 
          className="btn-action btn-edit"
          aria-label="Edit product"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
          Edit
        </Link>
        
        <button 
          onClick={handleDelete}
          className="btn-action btn-delete"
          disabled={isLoading}
          aria-label="Delete product"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    );
  }

  return (
    <div className="customer-actions">
      <button 
        onClick={handleAddToCart}
        className={`btn-cart ${isAdded ? 'added' : ''}`}
        disabled={isLoading}
        aria-label="Add to cart"
      >
        {isLoading ? (
          <div className="btn-spinner"></div>
        ) : isAdded ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Added!
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
            </svg>
            Add to Cart
          </>
        )}
      </button>
      
      <Link 
        to={`/detail/${product._id}`} 
        className="btn-view"
        aria-label="View product details"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg>
        View Details
      </Link>
    </div>
  );
};

export default BtnRender;
