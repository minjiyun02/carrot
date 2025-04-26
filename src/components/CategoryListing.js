import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoryListing.css';

function CategoryListing({ products }) {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [locationFilter, setLocationFilter] = useState('');
  const [lotFilter, setLotFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.category === categoryName)
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        locationFilter ? product.location === locationFilter : true
      )
      .filter((product) =>
        lotFilter ? product.lot === lotFilter : true
      )
      .sort((a, b) => {
        const priceA = parseFloat(a.price) || 0;
        const priceB = parseFloat(b.price) || 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
  }, [products, categoryName, searchTerm, sortOrder, locationFilter, lotFilter]);

  const uniqueLocations = [...new Set(products.map((p) => p.location).filter(Boolean))];
  const uniqueLots = [...new Set(products.map((p) => p.lot).filter(Boolean))];

  return (
    <div className="category-listing">
      <div className="category-header">
        <div className="category-subtitle-container">
          <span>You are now browsing: </span>
          <strong>{categoryName}</strong>
        </div>
        <Link to="/" className="back-home-link">← Back to Home</Link>
      </div>

      <div className="category-main">
        <aside className="filters">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />

          <div className="filter-group">
            <label>Sort by Price:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-select"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Location:</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>LOT #:</label>
            <select
              value={lotFilter}
              onChange={(e) => setLotFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All</option>
              {uniqueLots.map((lot) => (
                <option key={lot} value={lot}>{lot}</option>
              ))}
            </select>
          </div>
        </aside>

        <div className="category-content">
          <div className="vehicle-search-box">
            <h3 className="vehicle-search-title">Find a Vehicle</h3>
            <div className="vehicle-search-tabs">
              <button className="tab active">Cars & Trucks</button>
              <button className="tab">Motorcycles</button>
              <button className="tab">Other</button>
            </div>

            <div className="vehicle-search-fields">
              <input type="text" placeholder="Make" />
              <input type="text" placeholder="Model" />
              <input type="text" placeholder="Condition" />
              <button className="search-button">Find Vehicles</button>
            </div>
          </div>

          <div className="listings-container">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index} className="listing-card">
                  <img
                    src={product.image || '/images/default.png'}
                    alt={product.name}
                    c lassName="listing-image"
                  />
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
      </div>
    </div>
  );
}

export default CategoryListing;
