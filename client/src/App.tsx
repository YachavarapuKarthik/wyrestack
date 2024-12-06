import Header from "./components/header/Header.tsx"
import Footer from "./components/footer/Footer.tsx"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProfileDashboard from "./components/ProfileDashboard.tsx";
import CoursePage from "./components/CoursePage.tsx";
import AdminPage from "./components/AdminPage.tsx";

function App(){
  
  return (
    <>
    <Header />
      <div className="app-container">
      
      <div className="content">
      <AdminPage/>
    <CoursePage/>
      </div>
     
    </div> 
    <Footer />
    {/* <CoursePage/> */}
    
    </>
  );
}

export default App;