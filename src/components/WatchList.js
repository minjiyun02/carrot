import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WatchList.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/watchlist?userId=${userId}`)
      .then((res) => setWatchlist(res.data))
      .catch((err) => console.error('Error fetching watchlist:', err));
  }, [userId]);

  return (
    <div className="watchlist-container">
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No items in your watchlist.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((item, index) => (
            <Link to={`/listing/${item.listingId}`} className="watchlist-card" key={index}>
              <img
                src={`http://localhost:5000/api/listings/${item.listingId}/photo/0`}
                alt={item.title || 'Watchlist Item'}
                className="watchlist-thumbnail"
              />
              <div className="watchlist-info">
                <h3>{item.title}</h3>
                <p className="watchlist-price">{item.price} USD</p>
                <p className="watchlist-location">📍 {item.location}</p>
                <p className="watchlist-saleType">Sale Type: {item.saleType}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
