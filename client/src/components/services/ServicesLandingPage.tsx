import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import Contact from "../landing-page/contact";
import Home from "../landing-page/Home";
import LandingPage from "../landing-page/LandingPage";
import ServicesList from "./ServicesList";
import ServiceHome from "./ServiceHome";

function ServicesLandingPage(){
    return (
        <>
        <NavBar/>
        <ServiceHome/>
        <ServicesList/>
        <Contact/>
        <Footer/>
        </>


    );

}

export default ServicesLandingPage;