import axios from 'axios';
import { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useParams } from 'react-router-dom';
import './ListingDetails.css';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);



  // Optional: Adjust this line if user ID comes from localStorage or context
  const userId = localStorage.getItem('userId');

  // Fetch listing data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error('Failed to fetch listing:', err));
  }, [id]);

  // Check if this listing is already in the watchlist
  useEffect(() => {
    axios.get(`http://localhost:5000/api/watchlist/${userId}/${id}`)
      .then((res) => setIsInWatchlist(res.data.exists))
      .catch((err) => console.error('Watchlist check failed:', err));
  }, [id, userId]);

  

  const toggleWatchlist = async () => {
    try {
      if (isInWatchlist) {
        await axios.delete(`http://localhost:5000/api/watchlist/${userId}/${id}`);
        setIsInWatchlist(false);
      } else {
        await axios.post('http://localhost:5000/api/watchlist', {
          userId,
          listingId: id,
          title: listing.title,
          price: listing.startPrice,
          location: listing.itemLocation,
          saleType: listing.saleType
        });
        setIsInWatchlist(true);
      }
    } catch (err) {
      console.error('Failed to update watchlist:', err);
    }
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <div className="details-main">
        <div className="details-gallery">
          <div className="thumbnails">
            {listing.photos?.map((_, index) => (
              <img
                key={index}
                src={`http://localhost:5000/api/listings/${listing._id}/photo/${index}`}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>

          <div className="main-image">
            <Zoom>
              <img
                src={`http://localhost:5000/api/listings/${listing._id}/photo/${selectedImageIndex}`}
                alt={listing.title}
                className="main-img"
                style={{ width: '100%', maxWidth: '600px', cursor: 'zoom-in' }}
              />
            </Zoom>
          </div>
        </div>

        <div className="listing-info">
          <h2>{listing.title}</h2>
          <h3>Price: ${listing.startPrice} USD</h3>
          <p className='saletype'><strong>Sale Type:</strong> {listing.saleType}</p>
          <p className="location"><strong>Location:</strong> {listing.itemLocation}</p>

          <div className="button-group">
            <button className="bid-button" onClick={() => setShowBidForm(!showBidForm)}>
              {showBidForm ? 'Cancel Bid' : 'Place Bid'}
            </button>
            <button className="watch-button" onClick={toggleWatchlist}>
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          </div>

          {showBidForm && (
            <form
              className="bid-form"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.post('http://localhost:5000/api/bids', {
                    userId, // replace this with actual session user ID
                    listingId: listing._id,
                    title: listing.title,
                    amount: bidAmount,
                    status: 'Pending'
                  });
                  alert('Your bid has been placed!');
                  setBidAmount('');
                  setShowBidForm(false);
                } catch (err) {
                  console.error('Bid failed:', err);
                  alert('Failed to place bid.');
                }
              }}
            >
              <input
                type="number"
                placeholder="Enter bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="bid-input"
                required
              />
              <button type="submit" className="submit-bid">Submit Bid</button>
            </form>
          )}


        </div>
      </div>

      <div className="details-lower">
        {listing.category === 'Vehicles' && (
          <section className="description-section">
            <h4>Description</h4>
            <table className="description-table">
              <tbody>
                <tr><td>Make / Brand</td><td>{listing.brand}</td></tr>
                <tr><td>Model</td><td>{listing.model}</td></tr>
                <tr><td>Year</td><td>—</td></tr>
                <tr><td>Miles</td><td>—</td></tr>
                <tr><td>Title Restriction</td><td>—</td></tr>
                <tr><td>VIN / Serial</td><td>—</td></tr>
                <tr><td>Condition</td><td>{listing.condition}</td></tr>
                <tr><td>Inventory ID</td><td>—</td></tr>
              </tbody>
            </table>
          </section>
        )}

        <section className="more-info-section">
          <h4>More Info</h4>
          <div className="more-info-grid">
            <p><strong>Seller Name:</strong> {listing.sellerName}</p>
            <p><strong>Account Type:</strong> {listing.accountType}</p>
            <p><strong>Location:</strong> {listing.itemLocation}</p>
            <p><strong>Color:</strong> {listing.color}</p>
            <p><strong>Age:</strong> {listing.age}</p>
            <p><strong>Condition:</strong> {listing.condition}</p>
          </div>
        </section>

        <section className="more-info-section">
          <h4>Q & A</h4>
          <button>Ask Questions to the Seller</button>
        </section>

        {listing.manufacturerSpec && (
          <section>
            <h4>Manufacturer's Specifications</h4>
            <p>Additional specs content goes here if available...</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default ListingDetails;
