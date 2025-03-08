import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [accountType, setAccountType] = useState("Personal");
  const [formData, setFormData] = useState({
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

  // ✅ Account Type 변경 함수 (초기화 포함)
const handleAccountTypeChange = (type) => {
  setAccountType(type);

  // ✅ Personal → Business 전환 시 초기화
  if (type === "Business") {
    setFormData({
      businessName: "",
      email: "",
      password: "",
      confirmPassword: "",
      state: "",
    });
  }

  // ✅ Business → Personal 전환 시 초기화
  else {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    });
  }
};

  const [error, setError] = useState("");

  // 🔹 입력 값 업데이트 핸들러
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 비밀번호 검증 함수
  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // ✅ 현재 입력된 비밀번호 상태
  const passwordValidation = validatePassword(formData.password);

  // 🔹 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords must match!");
      return;
    }
    setError("");
    alert("✅ Registration successful!");
  };

  return (
    <div className="register-page">
      {/* 왼쪽 이미지 & 로고 */}
      <div className="register-left">
      <Link to="/">
  <img src="/images/logo.png" alt="GovDeals Logo" className="govdeals-logo" />
</Link>
        <img src="/images/hand.png" alt="Handshake" className="register-image" />
      </div>

      {/* 오른쪽 회원가입 폼 */}
      <div className="register-container">
        <h1>Create Your Account Today!</h1>

        {/* ✅ Personal/Business 선택 토글 */}
        <div className={`toggle-switch ${accountType === "Business" ? "business-active" : ""}`}>
          <label className="toggle-option" onClick={() => handleAccountTypeChange("Personal")}>
            Personal
          </label>
          <label className="toggle-option" onClick={() => handleAccountTypeChange("Business")}>
            Business
          </label>
          <div className="toggle-slider"></div>
        </div>

        {/* 🔹 폼 */}
        <form onSubmit={handleSubmit} className="form-container">
          {accountType === "Personal" ? (
            <>
              <div className="name-fields">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Business Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </>
          )}

          {/* ✅ 비밀번호 입력 */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* ✅ 비밀번호 조건 표시 */}
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          {/* ✅ Country & State */}
          {accountType === "Personal" && (
            <div className="location-fields">
              <div className="select-container">
                <select name="country" value={formData.country} onChange={handleInputChange} required>
                  <option value="">Country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>

              <div className="select-container">
                <select name="state" value={formData.state} onChange={handleInputChange} required>
                  <option value="">Select State</option>
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="New York">New York</option>
                  <option value="Florida">Florida</option>
                  <option value="Illinois">Illinois</option>
                </select>
              </div>
            </div>
          )}

          {/* ✅ City & Zip Code */}
          {accountType === "Personal" && (
            <div className="location-fields">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {/* ✅ Business State */}
          {accountType === "Business" && (
            <div className="select-container">
              <select name="state" value={formData.state} onChange={handleInputChange} required>
                <option value="">Select State</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="New York">New York</option>
                <option value="Florida">Florida</option>
                <option value="Illinois">Illinois</option>
              </select>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="register-button">
            Create an Account
          </button>
        </form>

        {/* ✅ 로그인 링크 */}
        <div className="signin-container">
          <p>Already have an account?</p>
          <Link to="/signin">
            <button className="signin-button">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
