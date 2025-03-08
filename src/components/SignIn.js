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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("❌ Please enter both email and password.");
      return;
    }
    setError("");
    alert("✅ Sign-in successful!");
  };

  return (
    <div className="login-page"> {/* ✅ 변경 */}
      {/* 왼쪽 GovDeals 로고 & 이미지 */}
      <div className="login-left"> {/* ✅ 변경 */}
        <Link to="/">
          <img src="/images/logo.png" alt="GovDeals Logo" className="govdeals-logo" />
        </Link>
        <img src="/images/hand.png" alt="Handshake" className="login-image" /> {/* ✅ 변경 */}
      </div>

      {/* 오른쪽 로그인 폼 */}
      <div className="login-container"> {/* ✅ 변경 */}
        <h1>Sign In to Your Account</h1>

        <form onSubmit={handleSubmit} className="login-form"> {/* ✅ 변경 */}
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
          <button type="submit" className="login-button"> {/* ✅ 변경 */}
            Sign In
          </button>
        </form>

        {/* 🔹 회원가입 페이지 이동 링크 */}
        <div className="register-link-container"> {/* ✅ 변경 */}
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button className="register-link-button">Sign Up</button> {/* ✅ 변경 */}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
