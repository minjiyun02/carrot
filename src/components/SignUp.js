import React from 'react';

function SignUp() {
  return (
    <div className="page-container">
      <h1>Register</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" placeholder="Your Name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Your email@example.com" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <label>Enter Your Password Again:</label>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default SignUp;
