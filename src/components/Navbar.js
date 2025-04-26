import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }

    const handleStorageChange = () => {
      setUserName(localStorage.getItem('userName'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
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

          {/* sell now always visible */}
          <Link to="/upload-product" className="nav-text-link">Sell Now</Link>

          {userName ? (
            <>
              <span className="nav-text-link">Hi, {userName}</span>
              <div onClick={handleLogout} className="nav-text-link logout-button">Logout</div>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-text-link">Sign In</Link>
              <Link to="/signup" className="nav-text-link">Sign Up</Link>
            </>
          )}

          <div className="nav-location">
            <img src="/images/location.png" alt="Location" className="location-icon" />
            <span> Davis, CA</span> 
          </div>
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