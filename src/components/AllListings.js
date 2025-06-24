import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AllListings.css';

function AllListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/listings')
      .then((res) => setListings(res.data))
      .catch((err) => console.error('Failed to load listings:', err));
  }, []);

  return (
    <div className="all-listings-container">
      <h1>New Listings</h1>
      <div className="all-listings-grid">
        {listings.map((listing) => (
          <Link to={`/listing/${listing._id}`} key={listing._id} className="all-listing-card">
            <img
              src={`http://localhost:5000/api/listings/${listing._id}/photo/0`}
              alt={listing.title}
              className="all-listing-image"
            />
            <div className="all-listing-info">
              <h3>{listing.title}</h3>
              <p><strong>Price:</strong> ${listing.startPrice}</p>
              <p><strong>Location:</strong> {listing.itemLocation}</p>
              <p><strong>Sale Type:</strong> {listing.saleType}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllListings;
