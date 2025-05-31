import './UploadProduct.css';

function UploadProduct() {
  return (
    <div className="form-container">
      <h1 className="form-title">List Your Item!</h1>
      <form className="form">
        <input type="text" placeholder="Name of the Product" className="form-input" />
        <input type="number" placeholder="Price" className="form-input" />
        <textarea placeholder="Description" className="form-input textarea" />
        <button type="submit" className="form-button">List</button>
      </form>
    </div>
  );
}

export default UploadProduct;
