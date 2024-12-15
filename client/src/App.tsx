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
  return (
    <BrowserRouter>
      <Header />
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
