import axios from 'axios';
import { useState } from 'react';
import './CreateListing.css';

function CreateListing() {
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
        manufacturerSpec: false,
        startPrice: '',
        bidIncrement: '',
        buyNowPrice: '',
        photos: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhotoChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        photos: Array.from(e.target.files).slice(0, 6) // limit to 6
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
        if (key === 'photos') {
        formData.photos.forEach((photo) => formDataToSend.append('photos', photo));
        } else {
        formDataToSend.append(key, formData[key]);
        }
    }

    try {
        await axios.post('http://localhost:5000/api/listings', formDataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        });
        alert('Listing submitted successfully!');
    } catch (error) {
        console.error('Submission error:', error);
        alert('Failed to submit listing.');
    }
    };


    return (
        <div className="listing-container">
        <h1 className="listing-title">List an Item</h1>

        <form onSubmit={handleSubmit} className="listing-form">
            <section>
            <h3>Photos</h3>
            <p>Upload up to 6 Photos in JPEG or PNG.</p>
            <div className="photo-grid">
                {[...Array(6)].map((_, i) => (
                <div key={i} className="photo-slot">
                    {formData.photos[i] ? (
                    <img
                        src={URL.createObjectURL(formData.photos[i])}
                        alt={`Preview ${i + 1}`}
                        className="preview-img"
                    />
                    ) : (
                    <span className="photo-placeholder">+</span>
                    )}
                </div>
                ))}
                <input
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={handlePhotoChange}
                className="photo-upload"
                />
            </div>
            </section>

            <section>
            <h3>Basic Information</h3>
            <input name="title" placeholder="Title" onChange={handleChange} />
            <select name="category" onChange={handleChange}>
                <option value="">Category</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Construction">Construction</option>
                <option value="Electronic & Technology">Electronic & Technology</option>
                <option value="Customer Goods">Customer Goods</option>
                <option value="Office & Education">Office & Education</option>
                <option value="Medical & Emergency">Medical & Emergency</option>
                <option value="Food & Agriculture">Food & Agriculture</option>
                <option value="Real Estate">Real Estate</option>
            </select>
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
            <h3>Enhance your listing</h3>
            <input name="color" placeholder="Color" onChange={handleChange} />
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
            <label className="switch-label">
                <input type="checkbox" name="manufacturerSpec" onChange={handleChange} />
                Toggle
            </label>
            </section>

            <section>
            <h3>Item Price</h3>
            <input name="startPrice" placeholder="Start Price" onChange={handleChange} />
            <input name="bidIncrement" placeholder="Bid Increment" onChange={handleChange} />
            <input name="buyNowPrice" placeholder="Buy It Now Price (Optional)" onChange={handleChange} />
            </section>

            <button type="submit" className="submit-button">Submit Listing</button>
        </form>
        </div>
    );
}

export default CreateListing;
