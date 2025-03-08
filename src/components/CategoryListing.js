import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoryListing.css';

function CategoryListing({ products }) {
  const { categoryName } = useParams();
  const filteredProducts = products.filter((product) => product.category === categoryName);

  return (
    <div className="category-listing">
      <h1>{categoryName} Listings</h1>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>← Back to Home</Link>

      <div className="listings-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="listing-card">
              <img src={product.image || '/images/default.png'} alt={product.name} className="listing-image" />
              
              <div className="listing-details">
                <h2 className="listing-title">{product.name}</h2>
                <p className="listing-price">${product.price} USD</p>
                <p className="listing-location">📍 {product.location || "Unknown Location"}</p>
                <p className="listing-lot">LOT #: {product.lot || "N/A"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items listed under this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryListing;
