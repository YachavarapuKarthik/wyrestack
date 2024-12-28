import React, { useState, useEffect } from 'react';
import Loader from "./components/Loader.tsx";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './css/Loader.css';
import LandingPage from './components/landing-page/LandingPage.tsx';
import CoursesLanding from './components/courses/CoursesLanding.tsx';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loader /> 
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesLanding/>} /> 
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
