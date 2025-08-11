import React, { useContext, useState, useEffect } from 'react';
import { GlobaLState } from '../../../GlobalState';
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = () => {
  const state = useContext(GlobaLState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate total price
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity);
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const addToCart = async (product) => {
    if (!cart.every(item => item._id !== product._id)) {
      const updatedCart = cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    }
  };

  const reduction = async (id) => {
    const updatedCart = cart.map(item => 
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const removeProduct = async (id) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      const updatedCart = cart.filter(item => item._id !== id);
      setCart(updatedCart);
    }
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      setCart([]);
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Add your checkout logic here
      console.log('Processing checkout...', { cart, total });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Checkout successful!');
      setCart([]);
    } catch (error) {
      alert('Checkout failed. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="#e5e7eb">
              <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="continue-shopping-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-cart-btn">
            Clear Cart
          </button>
        </div>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(product => (
            <div key={product._id} className="cart-item">
              <div className="item-image">
                <img 
                  src={product.images?.url || product.images} 
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>

              <div className="item-details">
                <Link to={`/detail/${product._id}`} className="item-title">
                  <h3>{product.title}</h3>
                </Link>
                
                <p className="item-description">
                  {product.description?.length > 100 
                    ? `${product.description.substring(0, 100)}...`
                    : product.description
                  }
                </p>

                <div className="item-meta">
                  <span className="item-category">{product.category}</span>
                  {product.inStock !== undefined && (
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                    </span>
                  )}
                </div>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => reduction(product._id)}
                    className="quantity-btn"
                    disabled={product.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-display">{product.quantity}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-pricing">
                  <div className="unit-price">
                    {formatPrice(product.price)} each
                  </div>
                  <div className="item-total">
                    {formatPrice(product.price * product.quantity)}
                  </div>
                </div>

                <button 
                  onClick={() => removeProduct(product._id)}
                  className="remove-btn"
                  aria-label="Remove item from cart"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({cart.length}):</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax:</span>
                <span>{formatPrice(total * 0.08)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>{formatPrice(total + (total * 0.08))}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="checkout-btn"
              disabled={isLoading || cart.some(item => !item.inStock)}
            >
              {isLoading ? (
                <>
                  <div className="checkout-spinner"></div>
                  Processing...
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <div className='footer'><p>This website is developed by <a href='https://sourabhnateria.vercel.app/'><p className='Admin'>Sourabh Nateria</p></a></p></div>
      
    </div>
    
  );
};

export default Cart;
