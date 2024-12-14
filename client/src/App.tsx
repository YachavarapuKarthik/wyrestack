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

// Custom LoginPopupWrapper Component
const LoginPopupWrapper = () => {
  const handleClosePopup = () => {
    // Implement close popup functionality
  };

  const handleOpenSignup = () => {
    // Implement open signup page functionality
  };

  const handleAuthSuccess = () => {
    // Implement authentication success functionality
  };

  return (
    <LoginPopup
      closePopup={handleClosePopup}
      openSignup={handleOpenSignup}
      onAuthSuccess={handleAuthSuccess}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassword/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
