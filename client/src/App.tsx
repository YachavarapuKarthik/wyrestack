import { useState } from "react";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileDashboard from "./components/ProfileDashboard.tsx";
import CoursePage from "./components/CoursePage.tsx";
import AdminPage from "./components/AdminPage.tsx";
import LoginPopup from "./components/LoginPopup.tsx";
import ForgotPassword from "./components/ForgotPassword.tsx";
import Home from "./components/Home.tsx";
import ContactNow from "./components/ContactNow.tsx";
import Payment from "./components/Payment.tsx";
import OnlineCompiler from "./components/compiler/CodeEditor.tsx"
import Logo from "./components/Logo.tsx"



function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <div className="content">


        </div>
      </div>
      <Footer />
      </>
  );
}

export default App;
