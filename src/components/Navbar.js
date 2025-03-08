import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('name'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    setUserName(null);
    window.location.href = "/signin";
  };

  return (
    <div className="nav-container">
      <nav className="nav-top">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="/images/logo.png" alt="GovDeals Logo" />
          </Link>
          <div className="nav-search">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button">
              <img src="/images/돋보기.png" alt="Search" />
            </button>
          </div>
        </div>

        <div className="nav-right">
          <img src="/images/위시리스트.png" alt="Wishlist" className="nav-icon" />
          <img src="/images/카트.png" alt="Cart" className="nav-icon" />
          {userName ? (
            <>
              <span className="nav-text-link">Hello, {userName}</span>
              <div onClick={handleLogout} className="nav-text-link">Logout</div>
            </>
          ) : (
            <>
              <Link to="/upload-product" className="nav-text-link">Sell now</Link>
              <Link to="/signup" className="nav-text-link">Sign up</Link>
              <Link to="/signin" className="nav-text-link">Log in</Link>
            </>
          )}
        </div>
      </nav>

      <nav className="nav-bottom">
        <Link to="/">Shop by Category</Link>
        <Link to="/">Closing Today</Link>
        <Link to="/">New Listing</Link>
        <Link to="/">About</Link>
      </nav>
    </div>
  );
}

export default Navbar;
