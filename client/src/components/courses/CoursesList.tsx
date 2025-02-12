import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  _id: string;
  logo: string;
  title: string;
  trainer: string;
  mode: string;
  price: {
    discounted: number;
    original: number;
  };
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnrollClick = (id: string) => {
    navigate(`/courses/${id}`);
  };

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
  }, [courses]);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="courses-section">
      <h1 className="section-title">Trending Courses are Here!!!</h1>
      <div className="courses-wrapper">
        {/* Navigation Buttons */}
        <div className="nav-btn-container">
          <button className="nav-btn left-arrow" onClick={() => handleScroll("left")}>
            ←
          </button>
          <button className="nav-btn right-arrow" onClick={() => handleScroll("right")}>
            →
          </button>
        </div>

        {/* Courses Container */}
        <div className="courses-container" ref={scrollContainerRef}>
          {courses.map((course) => (
            <div className="course-card slide-up" key={course._id}>
              <div className="image-container">
                <img src={course.logo} alt={course.title} className="course-logo" />
              </div>
              <h3>{course.title}</h3>
              <p className="mode">Mode: {course.mode}</p>
              <p className="trainer">Trainer: {course.trainer}</p>
              <p className="price">
                <span className="discounted">₹{course.price.discounted}</span>
                <span className="original">₹{course.price.original}</span>
              </p>
              <button className="enroll-btn" onClick={() => handleEnrollClick(course._id)}>
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;
