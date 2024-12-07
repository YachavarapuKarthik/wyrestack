import React, { useState, useEffect } from "react";
import axios from "axios";

// Review type definition
interface Review {
  _id?: string; // Optional because MongoDB will generate it
  name: string;
  course_id: string;
  rating: number;
  description: string;
}

const AdminPage: React.FC = () => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);
  const [course, setCourse] = useState({
    logo: "",
    banner: "",
    title: "",
    mode: "Online",
    start_date: "",
    duration: "",
    trainer: "",
    price: 0,
  });

  const [courses, setCourses] = useState<any[]>([]);

  // Fetch courses from the database
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const addOrUpdateCourse = async () => {
    try {
      if (editCourseId) {
        // Update existing course
        await axios.put(`http://localhost:5000/courses/edit/${editCourseId}`, course);
        alert("Course updated successfully!");
        setEditCourseId(null);
      } else {
        // Add new course
        await axios.post("http://localhost:5000/courses/add", course);
        alert("Course added successfully!");
      }
      setShowCourseForm(false);
      refreshCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const refreshCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error refreshing courses:", error);
    }
  };

  const editCourse = (course: any) => {
    setCourse(course);
    setEditCourseId(course._id);
    setShowCourseForm(true);
  };

  const deleteCourse = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/courses/delete/${id}`);
      alert("Course deleted successfully!");
      refreshCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {/* Manage Courses Section */}
      <div>
        <h2>Manage Courses</h2>
        <button onClick={() => setShowCourseForm(!showCourseForm)}>
          {showCourseForm ? "Close Form" : "Add New Course"}
        </button>

        {showCourseForm && (
          <div className="course-form">
            <input type="text" name="logo" placeholder="Logo URL" value={course.logo} onChange={handleCourseChange} />
            <input type="text" name="banner" placeholder="Banner URL" value={course.banner} onChange={handleCourseChange} />
            <input type="text" name="title" placeholder="Title" value={course.title} onChange={handleCourseChange} />
            <input type="text" name="mode" placeholder="Mode" value={course.mode} onChange={handleCourseChange} />
            <input type="date" name="start_date" value={course.start_date} onChange={handleCourseChange} />
            <input type="text" name="duration" placeholder="Duration" value={course.duration} onChange={handleCourseChange} />
            <input type="text" name="trainer" placeholder="Trainer" value={course.trainer} onChange={handleCourseChange} />
            <input type="number" name="price" placeholder="Price" value={course.price} onChange={handleCourseChange} />
            <button onClick={addOrUpdateCourse}>{editCourseId ? "Update Course" : "Add Course"}</button>
          </div>
        )}

        {/* Display Courses */}
        <div>
          <h3>All Courses</h3>
          {courses.map((course) => (
            <div key={course._id} className="course-item">
              <h4>{course.title}</h4>
              <p>Trainer: {course.trainer}</p>
              <p>Mode: {course.mode}</p>
              <p>Price: ₹{course.price}</p>
              <h5>Reviews:</h5>
              <ul>
                {course.reviews.map((review: any) => (
                  <li key={review._id}>
                    {review.name}: {review.rating} stars - {review.description}
                  </li>
                ))}
              </ul>
              <button onClick={() => editCourse(course)}>Edit</button>
              <button onClick={() => deleteCourse(course._id)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* Manage Reviews Section */}
      {/* 
      <div>
        <h2>Manage Reviews</h2>
        <button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Close Add Review Form" : "Add New Review"}
        </button> 
        {showReviewForm && (
          <div className="review-form">
            <input type="text" name="name" placeholder="Reviewer Name" onChange={handleReviewChange} />
            <select name="course_id" onChange={handleReviewChange}>
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleReviewChange} />
            <textarea name="description" placeholder="Review Description" onChange={handleReviewChange}></textarea>
            <button onClick={addReview}>Add Review</button>
          </div>
        )}
      </div> 
      */}
    </div>
  );
};

export default AdminPage;
