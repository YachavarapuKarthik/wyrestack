import { useState, useEffect } from 'react';
import axios from 'axios';

interface LoginPopupProps {
  isOpen: boolean;
  togglePopup: () => void;
}

function LoginPopup({ isOpen, togglePopup }: LoginPopupProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login status

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
      setIsLoggedIn(!!token); // Update the state based on token presence
    };

    checkLoginStatus();
  }, []);

  const toggleForm = () => setIsSignup((prev) => !prev);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    const endpoint = isSignup ? '/signup' : '/login';

    try {
      const response = await axios.post(`http://localhost:4000${endpoint}`, { email, password });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Save token in localStorage
        setIsLoggedIn(true); // Update the login state
        togglePopup(); // Close the popup
      } else {
        alert(response.data.message || 'An error occurred');
      }
    } catch (error: any) {
      alert(error.response?.data || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    setIsLoggedIn(false); // Update the login state
  };

  if (!isOpen) return null;

  return (
    <div>
      {isLoggedIn ? (
        <div className="logged-in-section">
          <h2>Welcome Back!</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={togglePopup} className="close-btn">
              &times;
            </button>

            {isSignup ? (
              <>
                <h2>Sign Up</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" required />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" required />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm your password" required />
                  </div>
                  <button type="submit" className="submit-btn">
                    Sign Up
                  </button>
                </form>
                <p>
                  Already have an account?{' '}
                  <span onClick={toggleForm} className="toggle-link">
                    Login
                  </span>
                </p>
              </>
            ) : (
              <>
                <h2>Login</h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" required />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" required />
                  </div>
                  <button type="submit" className="submit-btn">
                    Login
                  </button>
                </form>
                <p>
                  Don't have an account?{' '}
                  <span onClick={toggleForm} className="toggle-link">
                    Sign Up
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPopup;
