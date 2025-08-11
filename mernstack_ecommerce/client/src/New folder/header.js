import React, { useContext, useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
import { GlobaLState } from "../../GlobalState";
import axios from "axios";
import './header.css';

const Header = () => {
  const state = useContext(GlobaLState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const logoutUser = async () => {
    try {
      await axios.get('/user/logout');
      localStorage.clear();
      setIsAdmin(false);
      setIsLogged(false);
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu') && !event.target.closest('.user-btn')) {
        setIsUserMenuOpen(false);
      }
      if (!event.target.closest('.mobile-nav') && !event.target.closest('.menu-btn')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const adminRouter = () => {
    return (
      <>
        <li><Link to="/create_product" className="nav-link">Create Product</Link></li>
        <li><Link to="/category" className="nav-link">Categories</Link></li>
        <li><Link to="/users" className="nav-link">Users</Link></li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li><Link to="/history" className="nav-link">Order History</Link></li>
        <li><Link to="/profile" className="nav-link">Profile</Link></li>
      </>
    );
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">
            <h2>My-Ecommerce</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            {/* <li><Link to="/products" className="nav-link">Products</Link></li> */}
            {isAdmin && adminRouter()}
            {isLogged && loggedRouter()}
            {!isLogged && (
              <>
                <li><Link to="/login" className="nav-link">Login</Link></li>
                <li><Link to="/register" className="nav-link">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* Cart Icon */}
          <Link to="/cart" className="cart-icon">
            <IoCartOutline size={24} />
            {cart.length > 0 && (
              <span className="cart-badge" aria-label={`${cart.length} items in cart`}>
                {cart.length > 99 ? '99+' : cart.length}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {isLogged && (
            <div className="user-menu-container">
              <button 
                className="user-btn"
                onClick={toggleUserMenu}
                aria-expanded={isUserMenuOpen}
                aria-label="User menu"
              >
                <FiUser size={20} />
              </button>
              
              {isUserMenuOpen && (
                <div className="user-menu">
                  <div className="user-menu-header">
                    <span>Welcome back!</span>
                    {isAdmin && <span className="admin-badge">Admin</span>}
                  </div>
                  
                  <div className="user-menu-items">
                    <Link to="/profile" className="user-menu-item">
                      <FiUser size={16} />
                      Profile
                    </Link>
                    
                    {isAdmin && (
                      <Link to="/dashboard" className="user-menu-item">
                        <FiSettings size={16} />
                        Dashboard
                      </Link>
                    )}
                    
                    <button onClick={logoutUser} className="user-menu-item logout-btn">
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="menu-btn"
            onClick={toggleMobileMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <MdClose size={24} /> : <CiMenuFries size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li><Link to="/" className="mobile-nav-link">Home</Link></li>
          <li><Link to="/products" className="mobile-nav-link">Products</Link></li>
          
          {isLogged ? (
            <>
              {loggedRouter().props.children}
              {isAdmin && adminRouter().props.children}
              <li>
                <button onClick={logoutUser} className="mobile-nav-link logout-mobile">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="mobile-nav-link">Login</Link></li>
              <li><Link to="/register" className="mobile-nav-link">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </header>
  );
};

export default Header;
