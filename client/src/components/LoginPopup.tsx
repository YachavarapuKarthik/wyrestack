import { useState } from 'react';

interface LoginPopupProps {
  isOpen: boolean;
  togglePopup: () => void;
}

function LoginPopup({ isOpen, togglePopup }: LoginPopupProps) {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  const toggleForm = () => setIsSignup((prev) => !prev);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    togglePopup();  // Close the popup on form submit
  };

  return (
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
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input type="password" placeholder="Confirm your password" />
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
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" placeholder="Enter your password" />
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
  );
}

export default LoginPopup;
