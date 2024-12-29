import React, { useRef, useEffect, useState } from "react";
import coursesData from "./courses.json";

function Courses() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [courses, setCourses] = useState(coursesData);

    const handleScroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("slide-up");
                    } else {
                        entry.target.classList.remove("slide-up");
                    }
                });
            },
            { threshold: 0.2 }
        );

        const cards = document.querySelectorAll(".course-card");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="courses-section">
            <h2 className="section-title">Trending Courses are Here!!!</h2>
            <div className="courses-wrapper">
                <div className="nav-btn-container">
                    <button className="nav-btn top-arrow left-arrow" onClick={() => handleScroll("left")}>
                        ←
                    </button>
                    <button className="nav-btn top-arrow right-arrow" onClick={() => handleScroll("right")}>
                        →
                    </button>
                </div>
                <div className="courses-container" ref={scrollContainerRef}>
                    {courses.map((course, index) => (
                        <div className="course-card" key={index}>
                            <div className="image-container">
                                <img src={`./images/${course.image}`} alt={course.title} />
                            </div>
                            <h3>{course.title}</h3>
                            <p className="mode">MODE: {course.mode}</p>
                            <p className="trainer">Trainer: {course.trainer}</p>
                            <p className="price">
                                <span className="discounted">{course.price.discounted}</span>
                                <span className="original">{course.price.original}</span>
                            </p>
                            <button className="enroll-btn"  onClick={() => window.location.href = '/courses/coursedashboard'} >Enroll Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Courses;
