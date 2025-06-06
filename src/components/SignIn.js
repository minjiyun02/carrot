import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";


function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigate

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
      const response = await axios.post("http://localhost:5000/api/signin", formData);

      // ✅ Save user ID and optionally token
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("token", response.data.token); // if using tokens
      // Optionally save name as fallback
      localStorage.setItem("userName", response.data.firstName || response.data.username);

      // ✅ Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("❌ Invalid credentials.");
    }
  };


  return (
    <div className="login-page">
      {/* Left: Logo and Image */}
      <div className="login-left">
        <Link to="/">
          <img src="/images/logo.png" alt="GovDeals Logo" className="govdeals-logo" />
        </Link>
        <img src="/images/hand.png" alt="Handshake" className="login-image" />
      </div>

      {/* Right: Login Form */}
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

        {/* Sign Up link */}
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
