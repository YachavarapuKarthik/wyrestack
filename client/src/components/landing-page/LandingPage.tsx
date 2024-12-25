import Contact from "./contact";
import Courses from "./Courses";
import Footer from "./footer";
import Home from "./Home";
import OurServices from "./OurServices";
import Testinomials from "./Testinomials";

function LandingPage(){
    return (
        <>
        <Home/>
        <OurServices/>
        
        <Courses/>
        <Testinomials/>
        <Contact/>
        {/* { <div className="wavy-text">
        <span>L</span><span>E</span><span>T</span><span>'</span><span>S</span>
        <span>S</span><span>T</span><span>A</span><span>R</span><span>T</span>
        </div> } */}
        <Footer/>
        </>

    );
}

export default LandingPage;