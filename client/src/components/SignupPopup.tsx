import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Props {
  closePopup: () => void;
  openLogin: () => void;
  onAuthSuccess: (email: string) => void; // Notify NavBar of successful signup
}

const SignupPopup: React.FC<Props> = ({ closePopup, openLogin, onAuthSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/signup', { email, password });
      alert(response.data.message); // Show success message
      onAuthSuccess(email); // Notify NavBar
      closePopup(); // Close popup
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closePopup}>×</button>
        <h3>Sign Up</h3>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
          <div className="toggle-form">
            <span onClick={() => { closePopup(); openLogin(); }}>Already have an account? Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPopup;
