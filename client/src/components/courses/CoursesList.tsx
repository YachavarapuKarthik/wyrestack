import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory

interface Course {
  _id: string;
  logo: string;
  title: string;
  trainer: string;
  mode: string;
  price: number;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();  // useNavigate hook to navigate programmatically

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

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  const handleEnrollClick = (id: string) => {
    navigate(`/courses/${id}`);  // Use navigate to change the route
  };

  return (
    <section className="courses-section">
      <h1 className="section-title">Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <div className="courses-container">
          {courses.map((course) => (
            <div key={course._id}>
              <img src={course.logo} alt={course.title} className="course-logo" />
              <h2>{course.title}</h2>
              <p><strong>Trainer:</strong> {course.trainer}</p>
              <p><strong>Mode:</strong> {course.mode}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <button
                className="enroll-btn"
                onClick={() => handleEnrollClick(course._id)} // Pass the course ID here
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CourseList;
