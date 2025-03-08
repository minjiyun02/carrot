import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [accountType, setAccountType] = useState("Personal");
  const [formData, setFormData] = useState({
    accountType: "Personal",
    firstName: "",
    lastName: "",
    businessName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    specialChar: false,
  });

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const validatePassword = (password) => ({
    length: password.length >= 8,
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordValidation(validatePassword(value));
    }
  };

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setFormData((prevData) => ({
      ...prevData,
      accountType: type,
      businessName: type === "Business" ? "" : prevData.businessName,
      firstName: type === "Personal" ? "" : prevData.firstName,
      lastName: type === "Personal" ? "" : prevData.lastName,
      username: type === "Personal" ? "" : prevData.username,
      country: "",
      state: "",
      city: type === "Personal" ? prevData.city : "",
      zipCode: type === "Personal" ? prevData.zipCode : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords must match!");
      return;
    }

    if (!passwordValidation.length || !passwordValidation.number || !passwordValidation.specialChar) {
      alert("❌ Password must meet all requirements.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message}`);
      } else {
        alert("✅ Registration successful! Please sign in.");
        window.location.href = "/signin";
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("❌ Server error. Try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <Link to="/">
          <img src="/images/logo.png" alt="GovDeals Logo" className="govdeals-logo" />
        </Link>
        <img src="/images/hand.png" alt="Handshake" className="register-image" />
      </div>

      <div className="register-container">
        <h1>Create Your Account Today!</h1>

        <div className={`toggle-switch ${accountType === "Business" ? "business-active" : ""}`}>
          <label className="toggle-option" onClick={() => handleAccountTypeChange("Personal")}>
            Personal
          </label>
          <label className="toggle-option" onClick={() => handleAccountTypeChange("Business")}>
            Business
          </label>
          <div className="toggle-slider"></div>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          {accountType === "Personal" && (
            <>
              <div className="name-fields">
                <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleInputChange} required />
                <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            </>
          )}

          {accountType === "Business" && (
            <>
              <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Business Email" value={formData.email} onChange={handleInputChange} required />
            </>
          )}

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />

          {formData.password.length > 0 && (
            <div className="password-requirements">
              <p className={passwordValidation.length ? "valid" : "invalid"}>
                {passwordValidation.length ? "✔" : "❌"} Must be at least 8 characters
              </p>
              <p className={passwordValidation.number ? "valid" : "invalid"}>
                {passwordValidation.number ? "✔" : "❌"} Must include at least one number
              </p>
              <p className={passwordValidation.specialChar ? "valid" : "invalid"}>
                {passwordValidation.specialChar ? "✔" : "❌"} Must include at least one special character
              </p>
            </div>
          )}

          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} required />

          <div className="location-fields">
            <select name="country" value={formData.country} onChange={handleInputChange} required>
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>

            {formData.country === "United States" && (
              <select name="state" value={formData.state} onChange={handleInputChange} required>
                <option value="">Select State</option>
                {usStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            )}
          </div>

          {/* city and zip */}
          <div className="location-fields">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
            <input type="text" name="zipCode" placeholder="Zip code" value={formData.zipCode} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="register-button">Create an Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
