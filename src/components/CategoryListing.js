import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './CategoryListing.css';

function CategoryListing() {
  const { categoryName } = useParams();
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [locationFilter, setLocationFilter] = useState('');
  const [lotFilter, setLotFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/listings')
      .then(res => setListings(res.data))
      .catch(err => console.error('Error fetching listings:', err));
  }, []);

  useEffect(() => {
    const handleCategorySearch = (e) => {
      setSearchTerm(e.detail.toLowerCase());
    };

    window.addEventListener('categorySearch', handleCategorySearch);

    return () => {
      window.removeEventListener('categorySearch', handleCategorySearch);
    };
  }, []);

  const filteredListings = useMemo(() => {
    return listings
      .filter((product) => product.category === categoryName)
      .filter((product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) =>
        locationFilter ? product.itemLocation === locationFilter : true
      )
      .filter((product) =>
        lotFilter ? product.lot === lotFilter : true
      )
      .sort((a, b) => {
        const priceA = parseFloat(a.startPrice.replace('$', '')) || 0;
        const priceB = parseFloat(b.startPrice.replace('$', '')) || 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
  }, [listings, categoryName, searchTerm, sortOrder, locationFilter, lotFilter]);

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
          <h4 className="filter-section-title">Shop By Category</h4>
          {[
            'Vehicles',
            'Construction',
            'Electronic & Technology',
            'Customer Goods',
            'Office & Education',
            'Medical & Emergency',
            'Food & Agriculture',
            'Real Estate'
          ].map((cat, i) => (
            <Link to={`/category/${encodeURIComponent(cat)}`} key={i} className="filter-option">
              {cat}
            </Link>
          ))}
        </aside>

        <div className="category-content">
          {categoryName === "Vehicles" && (
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
          )}

          <div className="listings-container">
            {filteredListings.length > 0 ? (
              filteredListings.map((product, index) => (
                <Link to={`/listing/${product._id}`} key={index} className="listing-card-link">
                  <div className="listing-card">
                    <img
                      src={`http://localhost:5000/api/listings/${product._id}/photo/0`}
                      alt={product.title}
                      className="listing-image"
                    />
                    <div className="listing-details">
                      <h2 className="listing-title">{product.title}</h2>
                      <p className="listing-price">${product.startPrice} USD</p>
                      <p className="listing-location">📍 {product.itemLocation || "Unknown Location"}</p>
                      <p className="listing-lot">Sale Type: {product.saleType || "N/A"}</p>
                    </div>
                  </div>
                </Link>
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
