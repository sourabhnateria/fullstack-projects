import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlobaLState } from '../../../../GlobalState';
import './detailProduct.css';

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobaLState);
  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (params.id && products.length > 0) {
      const product = products.find(product => product._id === params.id);
      setDetailProduct(product);
    }
  }, [params.id, products]);

  if (!detailProduct) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  const relatedProducts = products
    .filter(product => 
      product.category === detailProduct.category && 
      product._id !== detailProduct._id
    )
    .slice(0, 4);

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / 
        <Link to="/products">Products</Link> / 
        <span>{detailProduct.title}</span>
      </div>

      <div className="product-detail-content">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={detailProduct.images?.url || detailProduct.images} 
              alt={detailProduct.title}
              className="main-product-image"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-badges">
            {detailProduct.inStock && <span className="badge in-stock">In Stock</span>}
            {detailProduct.discount && (
              <span className="badge discount">-{detailProduct.discount}% OFF</span>
            )}
          </div>

          <h1 className="product-title">{detailProduct.title}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`star ${i < (detailProduct.rating || 4) ? 'filled' : ''}`}
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="rating-text">({detailProduct.reviews || 0} reviews)</span>
          </div>

          <div className="price-section">
            {detailProduct.originalPrice && (
              <span className="original-price">${detailProduct.originalPrice}</span>
            )}
            <span className="current-price">${detailProduct.price}</span>
            {detailProduct.discount && (
              <span className="savings">
                Save ${(detailProduct.originalPrice - detailProduct.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                −
              </button>
              <input 
                id="quantity"
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="quantity-input"
                min="1"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
              </svg>
              Add to Cart
            </button>
            
            <button className="buy-now-btn">
              Buy Now
            </button>
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <strong>SKU:</strong> {detailProduct.sku || 'N/A'}
            </div>
            <div className="meta-item">
              <strong>Category:</strong> {detailProduct.category}
            </div>
            <div className="meta-item">
              <strong>Sold:</strong> {detailProduct.sold || 0} units
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tab-headers">
          <button 
            className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({detailProduct.reviews || 0})
          </button>
          <button 
            className={`tab-header ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            Shipping Info
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{detailProduct.description}</p>
              <div className="content-details">
                <p>{detailProduct.content}</p>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <p>Customer reviews will be displayed here.</p>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div className="shipping-content">
              <p>Shipping information and policies will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Related Products</h3>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <div key={product._id} className="related-product-card">
                <Link to={`/detail/${product._id}`}>
                  <img src={product.images?.url || product.images} alt={product.title} />
                  <h4>{product.title}</h4>
                  <span className="price">${product.price}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
