import React, { useState, useEffect } from 'react';
import Loader from "./components/Loader.tsx"
import Header from './components/header/Header.tsx';
import Footer from './components/footer/Footer.tsx';
import Home from './components/Home.tsx';

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
            <Home/>
          </div>

        </div>

        </>
      )}
    </>
  );
}

export default App;
