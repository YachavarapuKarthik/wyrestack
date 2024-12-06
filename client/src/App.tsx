import Header from "./components/header/Header.tsx"
import Footer from "./components/footer/Footer.tsx"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProfileDashboard from "./components/ProfileDashboard.tsx";

function App(){
  
  return (
    <>
      <div className="app-container">
      <Header />
      <div className="content">
        {/* <ProfileDashboard/> */}
      </div>
      <Footer />
    </div>
    </>
  );
}

export default App;