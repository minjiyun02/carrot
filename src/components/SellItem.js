import axios from 'axios';
import { useState } from 'react';
import './SellItem.css';

const SellItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    model: '',
    condition: '',
    saleType: '',
    color: '',
    age: '',
    sellerName: '',
    itemLocation: '',
    accountType: '',
    startPrice: '',
    bidIncrement: '',
    buyNowPrice: '',
    manufacturerSpec: false,
    photos: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      photos: Array.from(e.target.files)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const listingData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photos') {
        value.forEach((file) => listingData.append('photos', file));
      } else {
        listingData.append(key, value);
      }
    });

    try {
      await axios.post('http://localhost:5000/api/listings', listingData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Listing submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <div className="sell-form-container">
      <h1>List an Item</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <section>
          <h3>Photos</h3>
          <input type="file" name="photos" multiple accept="image/*" onChange={handleFileChange} />
        </section>

        <section>
          <h3>Basic Information</h3>
          <input name="title" placeholder="Title" onChange={handleChange} />
          <select name="category" onChange={handleChange}>
            <option value="">Category</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Construction">Construction</option>
            {/* Add more as needed */}
          </select>
          <input name="brand" placeholder="Brand" onChange={handleChange} />
          <input name="model" placeholder="Model" onChange={handleChange} />
          <select name="condition" onChange={handleChange}>
            <option value="">Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <select name="saleType" onChange={handleChange}>
            <option value="">Sale Type</option>
            <option>Online Auction</option>
            <option>Buy Now</option>
          </select>
        </section>

        <section>
          <h3>Enhance Your Listing</h3>
          <select name="color" onChange={handleChange}>
            <option value="">Color</option>
            <option>Red</option>
            <option>Blue</option>
          </select>
          <input name="age" placeholder="Age" onChange={handleChange} />
        </section>

        <section>
          <h3>Seller Information</h3>
          <input name="sellerName" placeholder="Seller Name" onChange={handleChange} />
          <input name="itemLocation" placeholder="Item Location" onChange={handleChange} />
          <select name="accountType" onChange={handleChange}>
            <option value="">Account Type</option>
            <option>Dealer</option>
            <option>Individual</option>
          </select>
        </section>

        <section>
          <h3>Manufacturer's Specifications</h3>
          <label>
            <input type="checkbox" name="manufacturerSpec" onChange={handleChange} />
            Enable
          </label>
        </section>

        <section>
          <h3>Item Price</h3>
          <input name="startPrice" placeholder="Start Price" onChange={handleChange} />
          <input name="bidIncrement" placeholder="Bid Increment" onChange={handleChange} />
          <input name="buyNowPrice" placeholder="Buy It Now Price (Optional)" onChange={handleChange} />
        </section>

        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};

export default SellItem;
