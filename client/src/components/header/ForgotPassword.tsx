import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState<number>(1); // 1 = Request OTP, 2 = Verify OTP, 3 = Reset Password
  const [message, setMessage] = useState<string>('');

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value);

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  // For using the navigator 
  const navigate = useNavigate();
  // Request OTP
  const requestOtp = async () => {
    try {
      const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:5000/forgot-password/request-otp', { email });
      setMessage(response.data.message);
      setStep(2); // Move to OTP verification step
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      setMessage(err.response?.data?.message || 'Error sending OTP. Please try again.');
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:5000/forgot-password/verify-otp', { email, otp });
      setMessage(response.data.message);
      setStep(3); // Move to reset password step
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      setMessage(err.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  // Reset Password
  const resetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response: AxiosResponse<{ message: string }> = await axios.post('http://localhost:5000/forgot-password/reset-password', { email, password, confirmPassword });
      setMessage(response.data.message);
      setStep(1); // Reset to initial step
      setEmail('');
      setOtp('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login')
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      setMessage(err.response?.data?.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h1>Forgot Password</h1>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      {step === 1 && (
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={handleEmailChange} 
            required 
          />
          <button onClick={requestOtp}>Request OTP</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={handleOtpChange} 
            required 
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 3 && (
        <div className="form-group">
          <input 
            type="password" 
            placeholder="New Password" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={handleConfirmPasswordChange} 
            required 
          />
          <button onClick={resetPassword}>Reset Password</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;
