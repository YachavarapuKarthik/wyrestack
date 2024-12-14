// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';

// interface Props {
//   closePopup: () => void;
//   onAuthSuccess: (email: string, token: string) => void;
// }

// const AuthPopup: React.FC<Props> = ({ closePopup, onAuthSuccess }) => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [otp, setOtp] = useState<string>('');
//   const [step, setStep] = useState<number>(1); // 1 = Sign up, 2 = Forgot Password (request OTP), 3 = Verify OTP, 4 = Reset Password
//   const [message, setMessage] = useState<string>(''); // For error or success messages

//   // Handle email change
//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

//   // Handle password change
//   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

//   // Handle confirm password change
//   const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

//   // Handle OTP change
//   const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => setOtp(e.target.value);

//   // Handle form submission for signup
//   const handleSignup = async (e: FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/auth/signup', { email, password });
//       const { token } = response.data;
//       alert(response.data.message);
//       onAuthSuccess(email, token); // Notify parent component with token
//       closePopup(); // Close the popup after success
//     } catch (error: any) {
//       setMessage(error.response?.data?.message || 'An error occurred');
//     }
//   };

//   // Request OTP for password reset
//   const requestOtp = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/forgot-password/request-otp', { email });
//       setMessage(response.data.message);
//       setStep(3); // Move to OTP verification step
//     } catch (error: any) {
//       setMessage(error.response?.data?.message || 'Error sending OTP. Please try again.');
//     }
//   };

//   // Verify OTP for password reset
//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/forgot-password/verify-otp', { email, otp });
//       setMessage(response.data.message);
//       setStep(4); // Move to password reset step
//     } catch (error: any) {
//       setMessage(error.response?.data?.message || 'Invalid OTP. Please try again.');
//     }
//   };

//   // Reset password after OTP verification
//   const resetPassword = async () => {
//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/forgot-password/reset-password', { email, password });
//       setMessage(response.data.message);
//       setStep(1); // Reset to initial step
//     } catch (error: any) {
//       setMessage(error.response?.data?.message || 'Failed to reset password. Please try again.');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-btn" onClick={closePopup}>×</button>
//         <h3>{step === 1 ? 'Sign Up' : step === 2 ? 'Forgot Password' : step === 3 ? 'Verify OTP' : 'Reset Password'}</h3>
//         {message && <p className="error">{message}</p>}

//         {step === 1 && (
//           <form onSubmit={handleSignup}>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={handlePasswordChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//                 required
//               />
//             </div>
//             <button type="submit" className="submit-btn">Sign Up</button>
//             <div className="toggle-form">
//               <span onClick={() => setStep(2)}>Forgot Password?</span>
//             </div>
//           </form>
//         )}

//         {step === 2 && (
//           <div>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmailChange}
//               required
//             />
//             <button onClick={requestOtp}>Request OTP</button>
//             <div className="toggle-form">
//               <span onClick={() => setStep(1)}>Back to Sign Up</span>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={handleOtpChange}
//               required
//             />
//             <button onClick={verifyOtp}>Verify OTP</button>
//             <div className="toggle-form">
//               <span onClick={() => setStep(2)}>Back to Request OTP</span>
//             </div>
//           </div>
//         )}

//         {step === 4 && (
//           <div>
//             <input
//               type="password"
//               placeholder="New Password"
//               value={password}
//               onChange={handlePasswordChange}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               required
//             />
//             <button onClick={resetPassword}>Reset Password</button>
//             <div className="toggle-form">
//               <span onClick={() => setStep(2)}>Back to Verify OTP</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPopup;
