// import React, { useRef, useEffect, useState } from "react";
// import coursesData from "./courses.json";
// import IMAGE from "../../assets/images/python.png"

// function Courses() {
//     const scrollContainerRef = useRef<HTMLDivElement>(null);
//     const [courses, setCourses] = useState(coursesData);

//     const handleScroll = (direction: "left" | "right") => {
//         if (scrollContainerRef.current) {
//             const scrollAmount = scrollContainerRef.current.offsetWidth;
//             scrollContainerRef.current.scrollBy({
//                 left: direction === "right" ? scrollAmount : -scrollAmount,
//                 behavior: "smooth",
//             });
//         }
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("slide-up");
//                     } else {
//                         entry.target.classList.remove("slide-up");
//                     }
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         const cards = document.querySelectorAll(".course-card");
//         cards.forEach((card) => observer.observe(card));

//         return () => observer.disconnect();
//     }, []);

//     return (
//         <section className="courses-section">
//             <h2 className="section-title">Trending Courses are Here!!!</h2>
//             <div className="courses-wrapper">
//                 <div className="nav-btn-container">
//                     <button className="nav-btn top-arrow left-arrow" onClick={() => handleScroll("left")}>
//                         ←
//                     </button>
//                     <button className="nav-btn top-arrow right-arrow" onClick={() => handleScroll("right")}>
//                         →
//                     </button>
//                 </div>
//                 <div className="courses-container" ref={scrollContainerRef}>
//                     {courses.map((course, index) => (
//                         <div className="course-card" key={index}>
//                             <div className="image-container">
//                                 <img src={IMAGE} alt={course.title} />
//                             </div>
//                             <h3>{course.title}</h3>
//                             <p className="mode">MODE: {course.mode}</p>
//                             <p className="trainer">Trainer: {course.trainer}</p>
//                             <p className="price">
//                                 <span className="discounted">{course.price.discounted}</span>
//                                 <span className="original">{course.price.original}</span>
//                             </p>
//                             <button className="enroll-btn"  onClick={() => window.location.href = '/courses/coursedashboard'} >Enroll Now</button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Courses;

// import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";

// interface Course {
//     _id: string;
//     title: string;
//     image: string;
//     mode: string;
//     trainer: string;
//     price: {
//         discounted: string;
//         original: string;
//     };
// }

// const Courses: React.FC = () => {
//     const scrollContainerRef = useRef<HTMLDivElement>(null);
//     const [courses, setCourses] = useState<Course[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/courses");
//                 setCourses(response.data);
//             } catch (err) {
//                 setError("Failed to load courses. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };
        
//         fetchCourses();
//     }, []);

//     const handleScroll = (direction: "left" | "right") => {
//         if (scrollContainerRef.current) {
//             const scrollAmount = scrollContainerRef.current.offsetWidth;
//             scrollContainerRef.current.scrollBy({
//                 left: direction === "right" ? scrollAmount : -scrollAmount,
//                 behavior: "smooth",
//             });
//         }
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("slide-up");
//                     } else {
//                         entry.target.classList.remove("slide-up");
//                     }
//                 });
//             },
//             { threshold: 0.2 }
//         );

//         const cards = document.querySelectorAll(".course-card");
//         cards.forEach((card) => observer.observe(card));

//         return () => observer.disconnect();
//     }, [courses]);

//     return (
//         <section className="courses-section">
//             <h2 className="section-title">Trending Courses are Here!!!</h2>
//             {loading ? (
//                 <p>Loading courses...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : (
//                 <div className="courses-wrapper">
//                     <div className="nav-btn-container">
//                         <button className="nav-btn top-arrow left-arrow" onClick={() => handleScroll("left")}>
//                             ←
//                         </button>
//                         <button className="nav-btn top-arrow right-arrow" onClick={() => handleScroll("right")}>
//                             →
//                         </button>
//                     </div>
//                     <div className="courses-container" ref={scrollContainerRef}>
//                         {courses.map((course) => (
//                             <div className="course-card" key={course._id}>
//                                 <div className="image-container">
//                                     <img src={`./images/${course.image}`} alt={course.title} />
//                                 </div>
//                                 <h3>{course.title}</h3>
//                                 <p className="mode">MODE: {course.mode}</p>
//                                 <p className="trainer">Trainer: {course.trainer}</p>
//                                 <p className="price">
//                                     <span className="discounted">{course.price.discounted}</span>
//                                     <span className="original">{course.price.original}</span>
//                                 </p>
//                                 <button className="enroll-btn" onClick={() => window.location.href = '/courses/coursedashboard'}>
//                                     Enroll Now
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// };

// export default Courses;

import React from "react";
import "../../css/coursepage-css/coursecards.css";

const courses = [
      { 
        title: "Introduction to Programming", 
        image: "/imgs/java.png",  
        startDate: "May 15, 2025"
      } ,
    { 
          title: "Mastering Data Structures", 
        image: "/imgs/data-structures.png",  // Correct path
        startDate: "March 10, 2025"
      },
      { 
        title: "Algorithms Beginner to Pro", 
        image: "/imgs/algorithms.png",  
        startDate: "April 5, 2025"
      }
      
  ];
  
const CourseList = () => {
  return (
    <>
    <div className="Ocontainer">
        <div className="Oinfo">
            <div className="Omatter">
              <br></br>
              <br></br>
              <h2>Upcoming Courses</h2>
            </div>
          </div>
        </div>
    <div className="Ccourse-container">
      
      {courses.map((course, index) => (
        <div key={index} className="Ccourse-card" >
           <img src={course.image} alt={course.title} className="Ccourse-image" />
          <h3>{course.title}</h3>
          <p className="start-date">Start Date: {course.startDate}</p>
          <br></br>
          <button className="Cbutton">Join now</button>
        </div>
      ))}
    </div>
    </>
    
  );
};

export default CourseList;
