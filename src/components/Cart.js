import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [bids, setBids] = useState([]);
  const [confirmingBidId, setConfirmingBidId] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) return;
    fetchBids();
  }, [userId]);

  const fetchBids = () => {
    axios.get(`http://localhost:5000/api/bids/user/${userId}`)
      .then((res) => setBids(res.data))
      .catch((err) => console.error('Error fetching bids:', err));
  };

  const handleCancelClick = (bidId) => {
    setConfirmingBidId(bidId);
  };

  const confirmCancel = async (bidId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bids/${bidId}`);
      setBids((prev) => prev.filter((bid) => bid._id !== bidId));
      setConfirmingBidId(null);
    } catch (err) {
      console.error('Failed to cancel bid:', err);
      alert('Could not cancel bid. Please try again.');
    }
  };

  const cancelConfirmation = () => {
    setConfirmingBidId(null);
  };

  return (
    <div className="cart-container">
      <h1>Your Bids</h1>
      {bids.length === 0 ? (
        <p>You haven't placed any bids yet.</p>
      ) : (
        <div className="cart-grid">
          {bids.map((bid) => (
            <div className="cart-card" key={bid._id}>
              <Link to={`/listing/${bid.listingId}`}>
                <img
                  src={`http://localhost:5000/api/listings/${bid.listingId}/photo/0`}
                  alt={bid.title}
                  className="cart-thumbnail"
                />
              </Link>
              <div className="cart-info">
                <h3>{bid.title}</h3>
                <p className="cart-price">Your Bid: ${bid.amount}</p>
                <p className="cart-status">Status: {bid.status || 'Pending'}</p>

                {confirmingBidId === bid._id ? (
                  <div className="confirm-cancel">
                    <p>Are you sure you want to cancel your bid?</p>
                    <button onClick={() => confirmCancel(bid._id)} className="yes-button">Yes</button>
                    <button onClick={cancelConfirmation} className="no-button">No</button>
                  </div>
                ) : (
                  <button className="cancel-bid-button" onClick={() => handleCancelClick(bid._id)}>
                    Cancel Bid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
