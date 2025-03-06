import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`❌ ${data.message}`);
        } else {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userName', data.name); // ✅ Store username
            alert('✅ Login successful!');
            window.location.href = "/";
        }
    } catch (error) {
        console.error(error);
        alert('❌ Server error. Try again.');
    }
  };




  return (
    <div className="page-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Your Email" 
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
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup">
        <button type="button" className="secondary-button">Register</button>
      </Link>
    </div>
  );
}

export default SignIn;
