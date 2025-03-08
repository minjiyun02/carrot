import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
        setError("❌ Please enter both email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.name);
        alert("✅ Login successful!");
        window.location.href = "/";
    } catch (error) {
        console.error("❌ Signin Error:", error);
        setError(`❌ ${error.message}`);
    }
  };


  return (
    <div className="login-page">
      <div className="login-left">
        <Link to="/">
          <img src="/images/logo.png" alt="GovDeals Logo" className="govdeals-logo" />
        </Link>
        <img src="/images/hand.png" alt="Handshake" className="login-image" />
      </div>

      <div className="login-container">
        <h1>Sign In to Your Account</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="register-link-container">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="register-link-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;