import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import CategoryListing from './components/CategoryListing';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TopProducts from './components/TopProducts';
import UploadProduct from './components/UploadProduct';

const categories = [
  'Vehicles', 'Construction', 'Electronic & Technology', 'Customer Goods', 
  'Office & Education', 'Medical & Emergency', 'Food & Agriculture', 'Real Estate'
];

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Vehicles', des: 'Cars, SUVs, Trucks', image: '/images/image1.png', category: 'Vehicles' },
    { id: 2, name: 'Construction', des: 'Heavy Machinery, Warehousing', image: '/images/Image 2.jpg', category: 'Construction' },
    { id: 3, name: 'Electronic & Technology', des: 'Computers, Phones, Cameras, Power', image: '/images/Image 3.jpg', category: 'Electronic & Technology' },
    { id: 4, name: 'Customer Goods', des: 'Furniture, Clothing, Jewelry, Arts, Garden, Sports', image: '/images/Image 4.jpg', category: 'Customer Goods' },
    { id: 5, name: 'Office & Education', des: 'Office Furniture, School, Printing', image: '/images/Image 5.jpg', category: 'Office & Education' },
    { id: 6, name: 'Medical & Emergency', des: 'First Aid, Safety Supplies, Fire', image: '/images/Image 6.jpg', category: 'Medical & Emergency' },
    { id: 7, name: 'Food & Agriculture', des: 'Food Processing, Kitchen, Storage', image: '/images/Image 7.jpg', category: 'Food & Agriculture' },
    { id: 8, name: 'Real Estate', des: 'Commercial, Industrial Property, Residential', image: '/images/Image 8.jpg', category: 'Real Estate' }
  ]);

  function addProduct(newProduct) {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }

  return (
    <Router>
      <Layout products={products} addProduct={addProduct} />
    </Router>
  );
}

function Layout({ products, addProduct }) {
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className="App">
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage products={products} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upload-product" element={<UploadProduct addProduct={addProduct} categories={categories} />} />
        <Route path="/category/:categoryName" element={<CategoryListing products={products} />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}


function MainPage({ products }) {
  return (
    <div className="main-page">
      <div className="product-grid">
        {products.map((product) => (
          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            key={product.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="product-box">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.des}</p>
            </div>
          </Link>
        ))}
      </div>
      <TopProducts />
    </div>
  );
}


export default App;