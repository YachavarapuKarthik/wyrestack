import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
//import Cookies from 'js-cookie'; // Import js-cookie

interface Props {
  closePopup: () => void;
  openSignup: () => void;
  onAuthSuccess: (email: string, token: string) => void; // Notify NavBar of successful login
}

const LoginPopup: React.FC<Props> = ({ closePopup, openSignup, onAuthSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token } = response.data; // Assume backend returns a token
      alert('Logged in successfully');
      onAuthSuccess(email, token); // Notify NavBar with email and token
      closePopup(); // Close popup
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={closePopup}>×</button>
        <h3>Login</h3>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="submit-btn">Login</button>
          <div className="toggle-form">
            <span onClick={() => { closePopup(); openSignup(); }}>Don't have an account? Sign up</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
