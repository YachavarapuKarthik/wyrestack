import { useState } from "react";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileDashboard from "./components/ProfileDashboard.tsx";
import CoursePage from "./components/CoursePage.tsx";
import AdminPage from "./components/AdminPage.tsx";
import LoginPopup from "./components/LoginPopup.tsx";
import ForgotPassword from "./components/header/ForgotPassword.tsx";
import Home from "./components/Home.tsx";

function App() {

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleOpenSignup = () => {
    console.log('Opening signup page...');
    // You can route to the signup page here, or open a signup form
  };

  const handleAuthSuccess = () => {
    console.log('User authenticated successfully!');
    // Perform any action on successful authentication (e.g., redirect, update UI)
  };


  return (
    <BrowserRouter>
      <Header />
      <div className="app-container">
        <div className="content">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />
            
            {/* Login Popup Route */}
            <Route
              path="/login"
              element={
                <LoginPopup
                  closePopup={handleClosePopup}
                  openSignup={handleOpenSignup}
                  onAuthSuccess={handleAuthSuccess}
                />
              }
            />
            
            {/* Forgot Password Route */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Profile Dashboard Route */}
            <Route path="/profile-dashboard" element={<ProfileDashboard />} />
            
            {/* Course Page Route */}
            <Route path="/course-page" element={<CoursePage />} />
            
            {/* Admin Page Route */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
