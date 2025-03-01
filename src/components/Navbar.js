import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">About Us</Link>
        <Link to="/">Buy</Link>
        <Link to="/upload-product">Sell</Link>
        <Link to="/">FAQ</Link>
        <Link to="/">Contact Us</Link>
      </div>
      <div className="nav-right">
        <select className="language-select">
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
