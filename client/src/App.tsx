import React, { useState, useEffect } from 'react';
import Loader from "./components/Loader.tsx"
import LandingPage from './components/landing-page/LandingPage.tsx';
import Upskill from './components/upskill/upskill.tsx';
import './css/LandingPage.css'
import './css/Loader.css'


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader /> 
      ) : (
        <>
        
        <div className='app-container'>
          <div className='content'>
            <Upskill/>
          </div>

        </div>

        </>
      )}
    </>
  );
}

export default App;
