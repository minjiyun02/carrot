import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import UploadProduct from './components/UploadProduct';
import TopProducts from './components/TopProducts';

const products = [
  { id: 1, name: 'Vehicles', des: 'Cars, SUVs, Trucks', image: '/images/image1.png' },
  { id: 2, name: 'Construction', des: 'Heavy Machinery, Warehousing', image: '/images/Image 2.jpg' },
  { id: 3, name: 'Electronic & Technology', des: 'Computers, Phones, Cameras, Power', image: '/images/Image 3.jpg' },
  { id: 4, name: 'Costomer Goods', des: 'Furniture, Clothing, Jewelry, Arts, Garden, Sports', image: '/images/Image 4.jpg' },
  { id: 5, name: 'Office & Education', des: 'Office Furniture, School, Printing', image: '/images/Image 5.jpg' },
  { id: 6, name: 'Medical & Emergency', des: 'First Aid, Safety Supplies, Fire', image: '/images/Image 6.jpg' },
  { id: 7, name: 'Food & Agriculture', des: 'Food Processing, Kitchen, Storage', image: '/images/Image 7.jpg' },
  { id: 8, name: 'Real Estate', des: 'Commercial, Industrial Property, Residential', image: '/images/Image 8.jpg' }
];

function MainPage() {
  return (
    <div className="main-page">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-box">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.des}</p>
          </div>
        ))}
      </div>
      <TopProducts />
    </div>
  );
}

function Layout() {
  const location = useLocation(); // 현재 경로 확인

  // ❌ /signup에서는 Navbar & Footer 숨기기
  const hideNavbarFooter = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className="App">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload-product" element={<UploadProduct />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
