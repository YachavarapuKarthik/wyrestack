import Header from "../header/Header";
import Contact from "./contact";
import Courses from "./Courses";
import Footer from "./Footer";
import Home from "./Home";
import OurServices from "./OurServices";
// import Testinomials from "./Testinomials";
import "../../css/landing-page-css/NavBar.css"
import "../../css/landing-page-css/Home.css"
import "../../css/landing-page-css/OurServices.css"
import "../../css/landing-page-css/Courses.css"
import "../../css/landing-page-css/Testomonicals.css"
import "../../css/landing-page-css/Contact.css"


function LandingPage(){
    return (
        <>
        <Header/>
        <Home/>
        <OurServices/>
        
        <Courses/>
        {/* <Testinomials/> */}
        <Contact/>
        
        <Footer/>
        </>

    );
}

export default LandingPage;