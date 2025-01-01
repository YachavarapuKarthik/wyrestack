import React, { useEffect, useState } from "react";
import axios from "axios";


interface Course {
  _id: string;
  logo: string;
  title: string;
  trainer: string;
  mode: string;
  start_date: string;
  duration: string;
  price: number;
}

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        console.log("API Response:", response.data); // Debugging API response
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="courses-section">
      <h1 className="section-title">Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <div className="courses-container">
          {courses.map((course) => (
            <div key={course._id} >
              <img src={course.logo} alt={course.title} className="course-logo" />
              <h2>{course.title}</h2>
              <p><strong>Trainer:</strong> {course.trainer}</p>
              <p><strong>Mode:</strong> {course.mode}</p>
              <p><strong>Start Date:</strong> {new Date(course.start_date).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CoursePage;
