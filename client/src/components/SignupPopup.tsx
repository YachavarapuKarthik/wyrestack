import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import image from '../assets/login-astro.png';

interface Props {
  closePopup: () => void;
  openLogin: () => void;
  onAuthSuccess: (email: string, token: string) => void; // Notify NavBar of successful signup
}

const SignupPopup: React.FC<Props> = ({ closePopup, openLogin, onAuthSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mode, setMode] = useState<'signup' | 'verifyOtp'>('signup');

  // Step 1: Handle the Signup form
  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Send signup request
      const response = await axios.post('http://localhost:5000/auth/signup', { email, password });
      if(response){
        alert(response.data);
        alert('Signup successful. Please verify your email with the OTP sent.');
      }

      // After signup, switch to OTP verification mode
      setMode('verifyOtp');

      // Send OTP request to the backend
      await axios.post('http://localhost:5000/auth/request-otp', { email });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  // Step 2: Handle OTP verification
  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Verify OTP
      const response = await axios.post('http://localhost:5000/auth//verify-sigup', { email, otp });
      alert('OTP verified successfully! You are now logged in.');

      // After OTP verification, auto-login
      const { token } = response.data; // Assume the backend returns a token
      onAuthSuccess(email, token); // Notify NavBar with email and token
      closePopup(); // Close popup after successful login
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
  
    if (/[^0-9]/.test(value)) return; // Only allow digits
  
    const otpArr = otp.split('');
    otpArr[index] = value;
    setOtp(otpArr.join(''));
  
    // Auto-focus to the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <img className="login-img" src={image} alt="Description of image" />
        <button className="close-btn" onClick={closePopup}>×</button>
        <h3>{mode === 'signup' ? 'Sign Up' : 'Verify OTP'}</h3>
        {errorMessage && <p className="error">{errorMessage}</p>}

        {/* Step 1: Signup Form */}
        {mode === 'signup' && (
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
        )}

        {/* Step 2: OTP Verification Form */}
        {mode === 'verifyOtp' && (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label>Enter OTP</label>
                <div className="otp-inputs">
                 {[...Array(6)].map((_, index) => (
                   <input
                     key={index}
                     id={`otp-input-${index}`}
                     type="text"
                     value={otp[index] || ''}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => handleOtpChange(e, index)}
                     maxLength={1}
                     required
                     className="otp-box"
                   />
                 ))}
               </div>        
               </div>
            <button type="submit" className="submit-btn">Verify OTP</button>
            <button type="button" className="back-btn" onClick={() => setMode('signup')}>Back</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPopup;
