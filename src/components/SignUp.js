import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError('❌ Passwords must match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(`❌ ${data.message}`);
        } else {
            alert('✅ Registration successful! Please sign in.');
            window.location.href = "/signin";
        }
    } catch (error) {
        console.error(error);
        setError('❌ Server error. Try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Your email@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Enter Your Password Again:</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="register-button">Register</button>
      </form>

      {/* ✅ 추가된 부분 */}
      <div className="signin-container">
        <p>Already have an account?</p>
        <Link to="/signin">
          <button className="signin-button">Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
