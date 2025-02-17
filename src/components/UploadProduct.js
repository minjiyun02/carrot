import React from 'react';

function UploadProduct() {
  return (
    <div className="page-container">
      <h1>List Your Item!</h1>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label>Item: </label>
          <input type="text" placeholder="Name of the Product" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price: </label>
          <input type="number" placeholder="Price" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description: </label>
          <textarea placeholder="Description" />
        </div>
        <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
          List
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
