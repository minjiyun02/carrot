import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadProduct({ addProduct, categories }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // preview url store
  const navigate = useNavigate();

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // preview
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !price || !description) {
      alert("Please fill out all fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      des: description,
      price,
      category,
      image: preview || '/images/default.png',
    };

    addProduct(newProduct);
    navigate('/');
  }

  return (
    <div className="page-container">
      <h1>List Your Item!</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Item: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of the Product" required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price: </label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description: </label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Upload Image: </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
          {preview && <img src={preview} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          List
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
