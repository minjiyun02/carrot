import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UploadProduct from './components/UploadProduct';

function MainPage() {
  return (
    <div className="main-page">
      <h1>GovDeals Re-Design</h1>
      <div className="button-container">
        <Link to="/signin">
          <button className="signup-button">Sign In / Register</button>
        </Link>
        <Link to="/upload-product">
          <button className="upload-button">Sell</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload-product" element={<UploadProduct />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
