import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="nav-container">
      {/* 첫 번째 줄 */}
      <nav className="nav-top">
        
        {/* 왼쪽 그룹 (로고 + 검색창) */}
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

        {/* 오른쪽 그룹 (아이콘 + 텍스트) */}
        <div className="nav-right">
          <img src="/images/위시리스트.png" alt="Wishlist" className="nav-icon" />
          <img src="/images/카트.png" alt="Cart" className="nav-icon" />
          <Link to="/images/.png" className="nav-text-link">Sell now</Link>
          <Link to="/images/Signup.png" className="nav-text-link">Sign up</Link>
          <Link to="/images/login.png" className="nav-text-link">Log in</Link>
        </div>
      </nav>

      {/* 두 번째 줄 */}
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
