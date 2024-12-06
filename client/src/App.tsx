import Header from "./components/header/Header.tsx"
import Footer from "./components/footer/Footer.tsx"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProfileDashboard from "./components/ProfileDashboard.tsx";
import CoursePage from "./components/CoursePage.tsx";

function App(){
  
  return (
    <>
      {/* <div className="app-container">
      <Header />
      <div className="content">
      </div>
      <Footer />
    </div> */}
    <CoursePage/>
    </>
  );
}

export default App;