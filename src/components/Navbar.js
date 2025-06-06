import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [userName, setUserName] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (location.pathname.startsWith('/category/')) {
      const event = new CustomEvent('categorySearch', { detail: searchText });
      window.dispatchEvent(event);
    } else {
      const event = new CustomEvent('mainSearch', { detail: searchText });
      window.dispatchEvent(event);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setUserName('');
    window.location.href = "/signin";
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserName(response.data.name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="nav-container">
      <nav className="nav-top">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src="/images/logo.png" alt="GovDeals Logo" />
          </Link>
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src="/images/돋보기.png" alt="Search" />
            </button>
          </div>
        </div>

        <div className="nav-right">
          {/* rest unchanged */}
          <Link to="/watchlist" className="nav-icon-link">
            <div className="nav-icon-container">
              <img src="/images/위시리스트.png" alt="Wishlist" className="nav-icon" />
              <span className="nav-icon-label">Watch List</span>
            </div>
          </Link>
          <Link to="/cart" className="nav-icon-link">
            <div className="nav-icon-container">
              <img src="/images/카트.png" alt="Cart" className="nav-icon" />
              <span className="nav-icon-label">My Bids</span>
            </div>
          </Link>
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
        <Link to="/listings">New Listing</Link>
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
}

export default Navbar;
