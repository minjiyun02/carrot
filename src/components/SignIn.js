import React from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
  return (
    <div className="page-container">
      <h1>Sign In</h1>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" placeholder="Your Username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup"> {/* Register 페이지 경로 연결 */}
        <button type="button" className="secondary-button">Register</button>
      </Link>
    </div>
  );
}

export default SignIn;
