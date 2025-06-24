import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadProduct.css';

function UploadProduct() {
  const initialData = {
    agencyName: '',
    contactPerson: '',
    contactTitle: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    email: '',
    phone: '',
    ext: '',
    fax: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [step, setStep] = useState('form'); // 'form' | 'confirm' | 'submitted'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleFinalSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/seller', formData);
      setStep('submitted');
    } catch (error) {
      alert('Error submitting form');
      console.error(error);
    }
  };

  const handleEdit = () => setStep('form');
  const handleCancel = () => {
    setFormData(initialData);
    setStep('form');
  };

  if (step === 'confirm') {
    return (
      <div className="form-container">
        {isLoggedIn && (
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <button
              onClick={() => navigate('/createlisting')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4f95ff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Create a Listing
            </button>
          </div>
        )}
        <h1 className="form-title">Seller Information</h1>
        <div className="confirm-grid">
          <div>
            <p><strong>Agency Name:</strong> {formData.agencyName}</p>
            <p><strong>Contact Person:</strong> {formData.contactPerson}</p>
            <p><strong>Contact Title:</strong> {formData.contactTitle}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Fax:</strong> {formData.fax}</p>
          </div>
          <div>
            <p><strong>Address 1:</strong> {formData.address1}</p>
            <p><strong>Address 2:</strong> {formData.address2}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>Country:</strong> {formData.country}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Postal Code:</strong> {formData.zipCode}</p>
          </div>
        </div>
        <div className="button-row">
          <button className="form-button" onClick={handleEdit}>Edit</button>
          <button className="form-button" onClick={handleCancel}>Cancel</button>
          <button className="form-button" onClick={handleFinalSubmit}>Submit</button>
        </div>
      </div>
    );
  }

  if (step === 'submitted') {
    return (
      <div className="form-container">
        {isLoggedIn && (
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <button
              onClick={() => navigate('/createlisting')}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4f95ff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Create a Listing
            </button>
          </div>
        )}
        <h1 className="form-title">Thank you!</h1>
        <p>Thank you for submitting your information. A copy of the information will be emailed to you.</p>
        <p>A representative from GovDeals will be contacting you soon. For questions or immediate assistance, contact Sales Support at 1-866-377-1494.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      {isLoggedIn && (
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <button
            onClick={() => navigate('/createlisting')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4f95ff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Create a Listing
          </button>
        </div>
      )}
      <h1 className="form-title">Become a Seller</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input name="agencyName" placeholder="Agency Name*" onChange={handleChange} className="form-input" />
        <input name="contactPerson" placeholder="Contact Person*" onChange={handleChange} className="form-input" />
        <input name="contactTitle" placeholder="Contact Title*" onChange={handleChange} className="form-input" />
        <input name="address1" placeholder="Address 1*" onChange={handleChange} className="form-input" />
        <input name="address2" placeholder="Address2" onChange={handleChange} className="form-input" />

        <div className="form-row">
          <input name="country" placeholder="Country*" onChange={handleChange} className="form-input" />
          <input name="state" placeholder="State*" onChange={handleChange} className="form-input" />
        </div>

        <div className="form-row">
          <input name="city" placeholder="City*" onChange={handleChange} className="form-input" />
          <input name="zipCode" placeholder="Zip code*" onChange={handleChange} className="form-input" />
        </div>

        <input name="email" placeholder="Email*" onChange={handleChange} className="form-input" />

        <div className="form-row">
          <input name="phone" placeholder="Phone*" onChange={handleChange} className="form-input" />
          <input name="ext" placeholder="Ext" onChange={handleChange} className="form-input" />
        </div>

        <input name="fax" placeholder="Fax" onChange={handleChange} className="form-input" />

        <button type="submit" className="form-button">Continue</button>
      </form>
    </div>
  );
}

export default UploadProduct;
