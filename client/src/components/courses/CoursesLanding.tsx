import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import Contact from "../landing-page/contact";
import CourseHome from "./CourseHome";
import CourseList from "./CoursesList";

function CoursesLanding(){
    return (
        <>
        <NavBar/>
        <CourseHome/>
        <CourseList/>
        <Footer/>
        </>
        
    );
}

export default CoursesLanding;