import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UploadProduct from './components/UploadProduct';

const products = [
  { id: 1, name: 'Chevrolet Trax LS 2024', price: '$20000', image: '/images/Image 1.jpg' },
  { id: 2, name: 'Product!', price: '$150', image: '/images/Image 2.jpg' },
  { id: 3, name: 'ASUS ROG GAMING PC AMD RYZEN 5600X ..', price: '$1000', image: '/images/Image 3.jpg' },
  { id: 4, name: 'Real Estate', price: '$750000', image: '/images/Image 4.jpg' },
  { id: 5, name: 'Product 5', price: '$300', image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Product 6', price: '$350', image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Product 7', price: '$400', image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Product 8', price: '$450', image: 'https://via.placeholder.com/150' }
];

function MainPage() {
  return (
    <div className="main-page">
      <h1> </h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-box">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
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
