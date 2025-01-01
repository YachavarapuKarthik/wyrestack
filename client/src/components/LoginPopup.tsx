import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import image from '../assets/login-astro.png';

interface Props {
  closePopup: () => void;
  openSignup: () => void;
  onAuthSuccess: (email: string, token: string) => void;
}

const LoginPopup: React.FC<Props> = ({ closePopup, openSignup, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'sendOtp' | 'verifyOtp' | 'resetPassword'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token } = response.data;
      console.log(response.data)
      alert('Logged in successfully');
      onAuthSuccess(email, token);
      closePopup();
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/auth/request-otp', { email });
      alert('OTP sent successfully');
      setMode('verifyOtp');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send OTP');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/auth/verify-otp', { email, otp });
      alert('OTP verified successfully');
      setMode('resetPassword');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
    }

    try {
        // Step 1: Send a reset password request
        const resetResponse = await axios.post('http://localhost:5000/auth/reset-password', {
            email,
            password,
            confirmPassword,
        });

        const { token } = resetResponse.data;
        setErrorMessage('Password reset done')
      // alert('Logged in successfully');
        onAuthSuccess(email, token);
        closePopup();
    } catch (error: any) {
        // Handle reset-password-specific errors
        if (error.resetResponse?.data?.message) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage('Failed to reset password or login. Please try again.');
        }
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
        <h3>{mode === 'login' ? 'Login' : 'Forgot Password'}</h3>
        {errorMessage && <p className="error">{errorMessage}</p>}

        {mode === 'login' && (
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
            <div className="toggle-form" style={{ textAlign: 'center' }}>
              <span onClick={() => setMode('sendOtp')}>Forgot Password?</span>
              <br />
              <span onClick={() => { closePopup(); openSignup(); }}>Don't have an account? Sign up</span>
            </div>
          </form>
        )}

        {mode === 'sendOtp' && (
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Send OTP</button>
            <button type="button" className="back-btn" onClick={() => setMode('login')}>Back to Login</button>
          </form>
        )}

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
            <button type="button" className="back-btn" onClick={() => setMode('sendOtp')}>Back</button>
          </form>
        )}

        {mode === 'resetPassword' && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                placeholder="New Password" 
                value={password} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                required 
              />
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} 
                required 
              />

            </div>
            <button type="submit" className="submit-btn">Reset Password</button>
            <button type="button" className="back-btn" onClick={() => setMode('login')}>Back to Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
